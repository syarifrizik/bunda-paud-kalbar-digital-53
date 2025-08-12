import React from 'react';

interface DebugInfoProps {
  visible?: boolean;
}

const DebugInfo: React.FC<DebugInfoProps> = ({ visible = false }) => {
  if (!visible && process.env.NODE_ENV === 'production') return null;

  const debugData = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    location: window.location.href,
    buildDate: '__BUILD_DATE__',
    nodeEnv: process.env.NODE_ENV,
    reactLoaded: !!React,
    routerLoaded: !!window.location,
  };

  console.log('🔍 Debug Info:', debugData);

  return (
    <div 
      className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded text-xs z-50 max-w-xs"
      style={{ fontSize: '10px', opacity: visible ? 1 : 0.7 }}
    >
      <div>✅ React Loaded</div>
      <div>📍 Path: {window.location.pathname}</div>
      <div>🌐 Host: {window.location.host}</div>
      <div>📅 Build: {debugData.buildDate}</div>
    </div>
  );
};

export default DebugInfo;