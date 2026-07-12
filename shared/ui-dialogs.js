/* Styled replacements for window.alert / window.confirm / window.prompt.
   Native dialogs show the page's origin ("rent-a-tune-app says...") and can't be
   themed; these render as an in-page modal that matches the rest of the app instead.
   Usage: import { showAlert, showConfirm, showPrompt } and `await` them from an
   async function — showConfirm/showPrompt resolve once the user picks an option. */

let overlayEl = null;

function injectStyles() {
    if (document.getElementById('ui-dialog-styles')) return;
    const style = document.createElement('style');
    style.id = 'ui-dialog-styles';
    style.textContent = `
        .ui-dialog-overlay {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(11, 28, 48, 0.6);
            align-items: center;
            justify-content: center;
            padding: 24px;
            z-index: 10000;
        }
        .ui-dialog-overlay.open { display: flex; }
        .ui-dialog {
            width: 100%;
            max-width: 400px;
            background: var(--surface-container-lowest, #fff);
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(11, 28, 48, 0.35);
            padding: 28px;
            text-align: center;
            font-family: var(--font-body, 'Montserrat', sans-serif);
            color: var(--on-surface, #0b1c30);
            animation: ui-dialog-pop 0.16s ease-out;
        }
        @keyframes ui-dialog-pop {
            from { transform: scale(0.94); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .ui-dialog-icon {
            width: 52px;
            height: 52px;
            margin: 0 auto 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 64, 224, 0.1);
            color: var(--primary, #0040e0);
        }
        .ui-dialog-icon .material-symbols-outlined { font-size: 28px; }
        .ui-dialog-confirm .ui-dialog-icon { background: rgba(254, 183, 0, 0.15); color: var(--secondary, #7c5800); }
        .ui-dialog-alert.ui-dialog-danger .ui-dialog-icon,
        .ui-dialog-confirm.ui-dialog-danger .ui-dialog-icon { background: rgba(186, 26, 26, 0.12); color: var(--error, #ba1a1a); }
        .ui-dialog-title {
            font-family: var(--font-display, 'Source Serif 4', serif);
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 8px;
        }
        .ui-dialog-message {
            font-size: 14px;
            line-height: 1.5;
            color: var(--on-surface-variant, #434656);
            white-space: pre-line;
            margin-bottom: 20px;
        }
        .ui-dialog-input-wrap { margin: -4px 0 20px; }
        .ui-dialog-input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 8px;
            border: 1px solid var(--outline-variant, #c4c5d9);
            font-size: 14px;
            font-family: inherit;
            outline: none;
            box-sizing: border-box;
        }
        .ui-dialog-input:focus {
            border-color: var(--primary, #0040e0);
            box-shadow: 0 0 0 2px rgba(0, 64, 224, 0.15);
        }
        .ui-dialog-actions {
            display: flex;
            gap: 12px;
        }
        .ui-dialog-btn {
            flex: 1;
            padding: 12px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            font-family: inherit;
            cursor: pointer;
            border: none;
            transition: opacity 0.15s, transform 0.1s;
        }
        .ui-dialog-btn:active { transform: scale(0.97); }
        .ui-dialog-btn-cancel {
            background: var(--surface-container-low, #eff4ff);
            color: var(--on-surface-variant, #434656);
            border: 1px solid var(--outline-variant, #c4c5d9);
        }
        .ui-dialog-btn-cancel:hover { background: var(--surface-container-high, #dce9ff); }
        .ui-dialog-btn-ok {
            background: var(--primary, #0040e0);
            color: var(--on-primary, #fff);
        }
        .ui-dialog-btn-ok:hover { opacity: 0.9; }
        .ui-dialog-danger .ui-dialog-btn-ok {
            background: var(--error, #ba1a1a);
            color: #fff;
        }
    `;
    document.head.appendChild(style);
}

function ensureDialogDom() {
    if (overlayEl) return overlayEl;
    injectStyles();
    overlayEl = document.createElement('div');
    overlayEl.className = 'ui-dialog-overlay';
    overlayEl.innerHTML =
        '<div class="ui-dialog">' +
            '<div class="ui-dialog-icon"><span class="material-symbols-outlined"></span></div>' +
            '<p class="ui-dialog-title"></p>' +
            '<p class="ui-dialog-message"></p>' +
            '<div class="ui-dialog-input-wrap"><input class="ui-dialog-input" type="text" /></div>' +
            '<div class="ui-dialog-actions">' +
                '<button class="ui-dialog-btn ui-dialog-btn-cancel" type="button">Cancel</button>' +
                '<button class="ui-dialog-btn ui-dialog-btn-ok" type="button">OK</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlayEl);
    return overlayEl;
}

const ICONS = { alert: 'info', confirm: 'help', prompt: 'edit' };

function openDialog(type, message, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
        const overlay = ensureDialogDom();
        const dialog = overlay.querySelector('.ui-dialog');
        const iconEl = overlay.querySelector('.ui-dialog-icon .material-symbols-outlined');
        const titleEl = overlay.querySelector('.ui-dialog-title');
        const msgEl = overlay.querySelector('.ui-dialog-message');
        const inputWrap = overlay.querySelector('.ui-dialog-input-wrap');
        const inputEl = overlay.querySelector('.ui-dialog-input');
        const cancelBtn = overlay.querySelector('.ui-dialog-btn-cancel');
        const okBtn = overlay.querySelector('.ui-dialog-btn-ok');

        dialog.className = 'ui-dialog ui-dialog-' + type + (opts.danger ? ' ui-dialog-danger' : '');
        iconEl.textContent = opts.icon || ICONS[type] || 'info';
        const title = opts.title || (type === 'confirm' ? 'Please Confirm' : (type === 'prompt' ? 'Input Needed' : 'Notice'));
        titleEl.textContent = title;
        msgEl.textContent = message || '';
        inputWrap.style.display = type === 'prompt' ? '' : 'none';
        inputEl.value = opts.defaultValue || '';
        cancelBtn.style.display = type === 'alert' ? 'none' : '';
        okBtn.textContent = opts.okLabel || 'OK';
        cancelBtn.textContent = opts.cancelLabel || 'Cancel';

        overlay.classList.add('open');
        setTimeout(function () { (type === 'prompt' ? inputEl : okBtn).focus(); }, 0);

        function cleanup(result) {
            overlay.classList.remove('open');
            document.removeEventListener('keydown', onKeydown);
            resolve(result);
        }
        function onKeydown(e) {
            if (e.key === 'Escape') {
                cleanup(type === 'prompt' ? null : false);
            } else if (e.key === 'Enter' && document.activeElement !== cancelBtn) {
                e.preventDefault();
                okBtn.click();
            }
        }
        document.addEventListener('keydown', onKeydown);

        okBtn.onclick = function () { cleanup(type === 'prompt' ? inputEl.value : true); };
        cancelBtn.onclick = function () { cleanup(type === 'prompt' ? null : false); };
        overlay.onclick = function (e) {
            if (e.target === overlay && type === 'alert') cleanup(true);
        };
    });
}

/** Styled alert() replacement. Resolves once the user dismisses it. */
export function showAlert(message, opts) {
    return openDialog('alert', message, opts);
}

/** Styled confirm() replacement. Resolves true/false. */
export function showConfirm(message, opts) {
    return openDialog('confirm', message, opts);
}

/** Styled prompt() replacement. Resolves the entered string, or null if cancelled. */
export function showPrompt(message, defaultValue, opts) {
    return openDialog('prompt', message, Object.assign({ defaultValue: defaultValue }, opts));
}
