(function(spriteCow) {
	// init
	(function() {
		function colourBytesToCss(color) {
			if (color[3] === 0) {
				return 'transparent';
			}
			return 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + String( color[3] / 255 ).slice(0, 5) + ')';
		}
		
		var $canvasContainer  = $('.canvas-inner'),
			$codeContainer    = $('.further-detail'),
			$pageContainer    = $('.container'),
			$toolbarContainer = $('.toolbar-container'),
			spriteCanvas      = new spriteCow.SpriteCanvas(),
			spriteCanvasView  = new spriteCow.SpriteCanvasView( spriteCanvas, $canvasContainer ),
			imgInput          = new spriteCow.ImgInput( $canvasContainer ),
			cssOutput         = new spriteCow.CssOutput( $codeContainer ),
			toolbar           = new spriteCow.Toolbar( $toolbarContainer );
			
		// TODO: open button
		
		imgInput.bind('load', function(img) {
			spriteCanvas.setImg(img);
			spriteCanvasView.setTool('selectSprite');
			cssOutput.backgroundFileName = imgInput.fileName;
			$pageContainer.removeClass('intro');
		});
		
		spriteCanvasView.bind('rectChange', function(rect) {
			cssOutput.rect = rect;
			cssOutput.update();
		});
		
		spriteCanvasView.bind('bgColorHover', function(color) {
			toolbar.feedback( colourBytesToCss(color) );
		});
		
		spriteCanvasView.bind('bgColorSelect', function(color) {
			var toolName = 'selectSprite';
			spriteCanvasView.setTool(toolName);
			toolbar.activate(toolName);
			toolbar.feedback( 'Background set to: ' + colourBytesToCss(color) );
		});
		
		toolbar.bind('selectBg', function() {
			var toolName = 'selectBg';
			spriteCanvasView.setTool(toolName);
			toolbar.activate(toolName);
		});
		
		toolbar.bind('selectSprite', function() {
			var toolName = 'selectSprite';
			spriteCanvasView.setTool(toolName);
			toolbar.activate(toolName)
		});
		
		toolbar.bind('openImg', function() {
			imgInput.openDialog();
		});
	})();
	
	// todo:
	// Copy button
	// Expanding animation
	// Drag & drop files
	// Layout animation
	// Maybe resize listener to center the canvas... maybe?
	// Footer
	// Some responsive design on homepage
	// Get domain
	// Feature test page (with random excuses!)
	// Create example image
	// Hover effects on toolbar buttons?
	// Better centering on select image button 
})(spriteCow);