'use strict';
const{Router}=require('express');const hc=require('../services/hive-client');const{getStats}=require('../services/newsletter-engine');const r=Router();const BT=new Date().toISOString();
r.get('/health',(_,s)=>s.json({status:'operational',service:'hive-newsletter-agent',version:'1.0.0',did:hc.AGENT_DID,uptime_seconds:Math.floor(process.uptime()),boot_time:BT}));
r.get('/.well-known/hive-pulse.json',(_,s)=>s.json({schema:'hive-pulse/v1',agent:'hive-newsletter-agent',did:hc.AGENT_DID,status:'online',capabilities:hc.AGENT_IDENTITY.capabilities,stats:getStats(),pulse_time:new Date().toISOString()}));
r.get('/.well-known/ai.json',(_,s)=>s.json({schema_version:'1.0',name:'HiveForce-Newsletter',description:'Automated newsletter — ecosystem updates, agent spotlights, metric digests, broadcast distribution',type:'agent-service',did:hc.AGENT_DID,capabilities:hc.AGENT_IDENTITY.capabilities}));
r.get('/robots.txt',(_,s)=>s.type('text/plain').send(`User-agent: *\nAllow: /\n\n# HiveForce-Newsletter — DID: ${hc.AGENT_DID}`));
module.exports=r;
