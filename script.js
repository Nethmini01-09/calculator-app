let current = '0';
let prev = '';
let operator = '';
let justCalc = false;

const resEl = document.getElementById('result');
const exprEl = document.getElementById('expr');

function updateDisplay() {
  resEl.textContent = current.length > 12
    ? parseFloat(current).toExponential(4)
    : current;
}

function fmt(n) {
  if (typeof n === 'string') return n;
  return parseFloat(n.toPrecision(10)).toString();
}

function calculate(a, op, b) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  if (op === '+') return x + y;
  if (op === '−') return x - y;
  if (op === '×') return x * y;
  if (op === '÷') return y === 0 ? 'Error' : x / y;
  return parseFloat(b);
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.val;

    if (val === 'C') {
      current = '0'; prev = ''; operator = ''; justCalc = false;
      exprEl.textContent = '';
      updateDisplay();
      return;
    }

    if (val === '+/-') {
      current = current.startsWith('-') ? current.slice(1) : '-' + current;
      updateDisplay();
      return;
    }

    if (val === '%') {
      current = fmt(parseFloat(current) / 100);
      updateDisplay();
      return;
    }

    if (['+', '−', '×', '÷'].includes(val)) {
      if (prev && operator && !justCalc) {
        const res = calculate(prev, operator, current);
        prev = fmt(res);
        current = fmt(res);
      } else {
        prev = current;
      }
      exprEl.textContent = prev + ' ' + val;
      operator = val;
      justCalc = false;
      current = '0';
      return;
    }

    if (val === '=') {
      if (!operator) return;
      const expr = prev + ' ' + operator + ' ' + current;
      const res = calculate(prev, operator, current);
      exprEl.textContent = expr + ' =';
      current = typeof res === 'string' ? res : fmt(res);
      prev = ''; operator = ''; justCalc = true;
      resEl.textContent = current;
      return;
    }

    if (val === '.') {
      if (justCalc) { current = '0.'; justCalc = false; updateDisplay(); return; }
      if (!current.includes('.')) current += '.';
      updateDisplay();
      return;
    }

    if (justCalc) { current = val; justCalc = false; }
    else current = current === '0' ? val : current + val;

    updateDisplay();
  });
});