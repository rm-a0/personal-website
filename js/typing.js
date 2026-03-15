// ── Config ──────────────────────────────────────────────────────────
const GLITCH_WORDS   = ['World', 'Guest', 'Visitor', 'Stranger', 'Human', 'Friend'];
const GLITCH_CHARS   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&?!';
const CMD_TEXT       = 'greetings.py';
const FINAL_WORD     = GLITCH_WORDS[Math.floor(Math.random() * GLITCH_WORDS.length)];

function randChar() {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function typeText(el, text, speed = 70) {
    return new Promise(resolve => {
        el.textContent = '';
        let i = 0;
        const iv = setInterval(() => {
            if (i < text.length) { el.textContent += text[i++]; }
            else { clearInterval(iv); resolve(); }
        }, speed);
    });
}

function glitchWord(el, finalWord) {
    return new Promise(resolve => {
        const totalMs = 1400, tickMs = 55;
        const ticks = Math.floor(totalMs / tickMs);
        let tick = 0;
        const iv = setInterval(() => {
            const progress = tick / ticks;
            const stable = Math.floor(progress * finalWord.length);
            let display = finalWord.slice(0, stable);
            for (let i = stable; i < finalWord.length; i++) display += randChar();
            el.textContent = display;
            if (++tick > ticks) {
                clearInterval(iv);
                el.textContent = finalWord;
                resolve();
            }
        }, tickMs);
    });
}

const SECTIONS = { init:'#intro', about:'#about', projects:'#projects', skills:'#skills', contact:'#contact' };
const SECTION_LIST = Object.keys(SECTIONS).join('   ');

function createOutputLine(html) {
    const line = document.createElement('div');
    line.className = 'terminal-line cmd-result';
    line.innerHTML = html;
    return line;
}

function handleCommand(raw, outputEl) {
    const cmd = raw.trim().toLowerCase();
    outputEl.innerHTML = '';
    if (!cmd) return;

    if (cmd === 'ls') {
        const items = Object.keys(SECTIONS)
            .map(k => `<span class="vt accent">${k}</span>`)
            .join('<span class="vt subtext">  /  </span>');
        outputEl.appendChild(createOutputLine(items));
        return;
    }

    if (cmd === 'help') {
        const commands = [
            { name: 'ls',           desc: 'list all sections' },
            { name: 'cd [section]', desc: 'navigate to a section' },
            { name: 'clear',        desc: 'clear output' },
        ];
        outputEl.appendChild(createOutputLine(`<span class="vt subtext">available commands:</span>`));
        commands.forEach(({ name, desc }) => {
            outputEl.appendChild(createOutputLine(
                `<span class="vt subtext">&nbsp;&nbsp;</span>` +
                `<span class="vt accent">${name.padEnd(14, '\u00a0')}</span>` +
                `<span class="vt subtext">${desc}</span>`
            ));
        });
        return;
    }

    if (cmd === 'clear') { outputEl.innerHTML = ''; return; }

    const cdMatch = cmd.match(/^cd\s+(\S+)$/);
    if (cdMatch) {
        const target = cdMatch[1].toLowerCase();
        if (SECTIONS[target]) {
            outputEl.appendChild(createOutputLine(
                `<span class="vt subtext">navigating to </span><span class="vt accent">/${target}</span>`
            ));
            setTimeout(() => document.querySelector(SECTIONS[target]).scrollIntoView({ behavior: 'smooth' }), 300);
        } else {
            outputEl.appendChild(createOutputLine(
                `<span class="vt red">cd: ${target}: no such section</span>` +
                `<span class="vt subtext"> — try: </span>` +
                Object.keys(SECTIONS).map(k => `<span class="vt accent">${k}</span>`).join('<span class="vt subtext">, </span>')
            ));
        }
        return;
    }

    outputEl.appendChild(createOutputLine(
        `<span class="vt red">command not found: ${cmd}</span>` +
        `<span class="vt subtext"> — type </span><span class="vt accent">help</span><span class="vt subtext"> for list</span>`
    ));
}

async function runIntro() {
    const cmdEl        = document.getElementById('typing-cmd');
    const greetLine    = document.getElementById('greeting-line');
    const glitchEl     = document.getElementById('glitch-word');
    const inputLine    = document.getElementById('input-line');
    const inputDisplay = document.getElementById('user-input-display');
    const cmdOutput    = document.getElementById('cmd-output');

    await sleep(400);
    await typeText(cmdEl, CMD_TEXT, 80);
    await sleep(250);
    greetLine.style.visibility = 'visible';
    await glitchWord(glitchEl, FINAL_WORD);
    await sleep(350);
    inputLine.style.visibility = 'visible';

    let buffer = '';
    document.addEventListener('keydown', (e) => {
        if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
        // Prevent space from scrolling the page
        if (e.key === ' ') e.preventDefault();
        if (e.key === 'Enter') {
            handleCommand(buffer, cmdOutput);
            buffer = '';
            inputDisplay.textContent = '';
            return;
        }
        if (e.key === 'Backspace') {
            e.preventDefault();
            buffer = buffer.slice(0, -1);
            inputDisplay.textContent = buffer;
            return;
        }
        if (e.key.length === 1) {
            buffer += e.key;
            inputDisplay.textContent = buffer;
        }
    });
}

document.addEventListener('DOMContentLoaded', runIntro);