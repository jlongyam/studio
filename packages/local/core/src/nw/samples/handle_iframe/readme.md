# handle iframe

Summary:

- by default iframe detected in dev-console as child of `top`
- basicaly nw.Window is not window
- every created iframe is nw.Window
- attribute 'nwdisable' and 'nwfaketop' have no affect
- new nw.Window.open is window.top
- manifest 'inject_js_start' and '_end' is file path
- url in nw.Window.open should not contains '\' back slash, convert first
- url outside path have no dev tool, but still can be access when 'focus'
- 
