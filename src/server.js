'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3032;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/newsletter'));
app.get('/',(_,r)=>r.json({service:'hive-newsletter-agent',version:'1.0.0',description:'Automated newsletter — ecosystem updates, agent spotlights, metric digests, broadcast distribution',endpoints:{execute:'POST /v1/newsletter/execute',record:'GET /v1/newsletter/record/:id',stats:'GET /v1/newsletter/stats',records:'GET /v1/newsletter/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-newsletter-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
