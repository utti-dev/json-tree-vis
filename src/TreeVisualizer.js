import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactFlow, { Controls, Background, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { jsonToFlow } from './utils/jsonToFlow';

function normalizePath(p) {
  if (!p) return '';
  const s = p.trim();
  if (s.startsWith('$')) return s;
  if (s.startsWith('.')) return `$${s}`;
  return s.startsWith('[') ? `$${s}` : `$.${s}`;
}

export default function TreeVisualizer({ json, searchPath }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [pathMap, setPathMap] = useState({});
  const [message, setMessage] = useState('');
  const rfiRef = useRef(null);

  useEffect(() => {
    if (!json) {
      setNodes([]);
      setEdges([]);
      setPathMap({});
      return;
    }
    const { nodes: n, edges: e, pathMap: pm } = jsonToFlow(json);
    setNodes(n);
    setEdges(e);
    setPathMap(pm);
    // small message clear
    setMessage('');
  }, [json]);

  useEffect(() => {
    if (!searchPath) {
      // reset highlights
      setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, highlighted: false } })));
      setMessage('');
      return;
    }
    const key = normalizePath(searchPath);
    const id = pathMap[key];
    if (!id) {
      setMessage('No match found');
      // flash outline
      const el = document.querySelector('.reactflow');
      if (el) {
        el.style.boxShadow = '0 0 0 4px rgba(244,67,54,0.15)';
        setTimeout(() => (el.style.boxShadow = ''), 700);
      }
      return;
    }
    setMessage('Match found');
    setNodes((nds) => nds.map((n) => ({ ...n, data: { ...n.data, highlighted: n.id === id } })));

    // center the node
    const node = nodes.find((n) => n.id === id);
    const rfi = rfiRef.current;
    if (node && rfi && rfi.setCenter) {
      // setCenter expects coordinates in world space
      rfi.setCenter(node.position.x, node.position.y, { duration: 600 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPath, pathMap]);

  const onInit = useCallback((rfi) => {
    rfiRef.current = rfi;
  }, []);

  const onNodeClick = useCallback((evt, node) => {
    // copy path to clipboard
    const p = node.data?.path;
    if (p) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(p).then(() => setMessage('Path copied to clipboard'));
      } else {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = p;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); setMessage('Path copied to clipboard'); } catch (e) { setMessage('Copy failed'); }
        ta.remove();
      }
    }
  }, []);

  const fitView = useCallback(() => {
    const rfi = rfiRef.current;
    if (rfi && rfi.fitView) rfi.fitView({ padding: 0.2 });
  }, []);

  const nodeTypes = useMemo(() => ({}), []);

  return (
    <div className="flow-wrap">
      <div className="flow-toolbar">
        <button onClick={fitView} title="Fit view">Fit</button>
        <button onClick={() => rfiRef.current?.zoomIn?.()} title="Zoom in">+</button>
        <button onClick={() => rfiRef.current?.zoomOut?.()} title="Zoom out">-</button>
        <div className="flow-message">{message}</div>
      </div>

      <div style={{ height: '100%', width: '100%' }} className="reactflow-wrapper">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes.map((n) => ({
              ...n,
              style: {
                ...n.style,
                boxShadow: n.data?.highlighted ? '0 6px 18px rgba(255,64,129,0.25)' : undefined,
                border: n.data?.highlighted ? '2px solid #ff4081' : (n.style?.border || '1px solid #222'),
              },
            }))}
            edges={edges}
            onInit={onInit}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            panOnDrag
            attributionPosition="bottom-left"
          >
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
