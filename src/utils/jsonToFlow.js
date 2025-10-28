// Convert JSON into React Flow nodes and edges and a path->nodeId map
let idCounter = 1;
function makeId() {
  return String(idCounter++);
}

function typeOfValue(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (typeof v === 'object') return 'object';
  return 'primitive';
}

export function jsonToFlow(json) {
  idCounter = 1;
  const nodes = [];
  const edges = [];
  const pathMap = {};
  const depthCount = {};

  function getPos(depth) {
    depthCount[depth] = (depthCount[depth] || 0) + 1;
    return { x: depth * 260, y: depthCount[depth] * 90 };
  }

  function lastKey(p) {
    if (!p) return null;
    // Return a readable last key/token of a path like
    // $.user.address.city -> city
    // $.items[0].name -> name
    // $.items[0] -> [0]
    const lastDot = p.lastIndexOf('.');
    const lastBracket = p.lastIndexOf('[');
    if (lastBracket > lastDot) {
      // path ends with an array index like ...[3]
      const close = p.indexOf(']', lastBracket);
      if (close > lastBracket) return p.substring(lastBracket, close + 1);
    }
    if (lastDot === -1) return p;
    return p.substring(lastDot + 1);
  }

  function visit(value, path, depth, parentId) {
    const t = typeOfValue(value);
    const id = makeId();
    const pos = getPos(depth);
    const label =
      t === 'object' ? `{ } ${lastKey(path) ?? 'root'}` :
      t === 'array' ? `[ ] ${lastKey(path) ?? 'root'}` :
      `${lastKey(path) ?? 'value'}: ${String(value)}`;

    const color =
      t === 'object' ? '#6c5ce7' :
      t === 'array' ? '#00b894' :
      '#fdcb6e';

    nodes.push({
      id,
      position: pos,
      data: { label, path, value, highlighted: false },
      style: {
        padding: 10,
        borderRadius: 6,
        background: color,
        color: '#111',
        minWidth: 160,
        textAlign: 'left',
      },
    });

    pathMap[path] = id;
    if (parentId) {
      edges.push({ id: `e${parentId}-${id}`, source: parentId, target: id, animated: false });
    }

    if (t === 'object') {
      for (const k of Object.keys(value)) {
        visit(value[k], path ? `${path}.${k}` : `$.${k}`, depth + 1, id);
      }
    } else if (t === 'array') {
      for (let i = 0; i < value.length; i++) {
        visit(value[i], `${path}[${i}]`, depth + 1, id);
      }
    }
  }

  visit(json, '$', 0, null);
  return { nodes, edges, pathMap };
}

export default jsonToFlow;
