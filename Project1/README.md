**Objective**
1. Create a dashboard which is useful and part of my daily work
2. Aircraft leasing business 
   - largely USD based
   - largest credit exposure from airlines customers
   	 	- airlines high USD cost base (affected by currency fluctuation)
   	 	- largest cost typically jet fuel (depending if they hedge)
   	 	- need to monitor news closely for developments (crashes etc)
&ensp
**Explanations of the technologies used**
1. Use AJAX data request to extract FX rates/ Jet fuel prices/ news and put them into array
2. Use Chart Js to plot charts
3. CSS display grid 
&ensp
**The approach taken**
1. Came up with wireframe of dashboard page I intended to have
2. Listed specs and functions I wanted 
&ensp
**Difficulties**
1. Simple CSS like freezing table header took a long time
2. Chart was not appearing as chart was called before ajax calls were completed
&ensp
**Unsolved problems or future work**
1. Improve AJAX data request (currently asynchronous) speed
2. Ability to add more charts in FX page for comparison
3. Ability to export data on my page
4. Ability to sort or filter data tables (currently can only sort)
5. Add interest rates tracker on dashboard page