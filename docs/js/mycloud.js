$(document).ready(function() {
	console.log( "MyCloud API DOC (ready)" );

	function control_node(node, isCollapsing) {
		var path = node.data('path');
		var startPath = path + '.';
		// console.log( "--- control_node() isCollapsing=" + isCollapsing + "  ------------------------" );
		// console.log( node );
		// console.log( "   path       = '" + path + "'" );
		// console.log( "   startPath  = '" + startPath + "'" );

		node.find('~ .mc-table-tr').each(function() {
			var subPath = $(this).data('path');
			var nodeType = $(this).data('type');
			var thisCollapsed = $(this).hasClass('collapsed');
			// console.log( "   subPath    = '" + subPath + "'" );
			// console.log( "   nodeType   = '" + nodeType + "'" );
			// console.log( "   thisColp   = '" + thisCollapsed + "'" );

			if ( nodeType == 'node' ) {
				if ( subPath.startsWith(startPath) ) {
					if ( subPath.indexOf( '.', startPath.length ) == -1 ) {
						// If we are expanding, and this "node" is collapsed,
						// then we need to leave it's children collapsed...
						if ( isCollapsing || ! thisCollapsed ) {
							control_node($(this), isCollapsing);
						}
						if ( isCollapsing ) {
							$(this).addClass('closed');
						} else {
							$(this).removeClass('closed');
						}
					}
				}
			} else {
				if ( subPath.startsWith(startPath) ) {
					if ( subPath.indexOf( '.', startPath.length ) == -1 ) {
						if ( isCollapsing ) {
							$(this).addClass('closed');
						} else {
							$(this).removeClass('closed');
						}
					}
				}
			}
		});
	}

	$('.rest-field-inner .ctl').on('click', function() {
		var thisRow = $(this).parents('.mc-table-tr');

		control_node( thisRow, ! thisRow.hasClass('collapsed') );

		if ( thisRow.hasClass('collapsed') ) {
			thisRow.removeClass('collapsed');
		} else {
			thisRow.addClass('collapsed');
		}
	});

	$('.code-examples .example-tabs li').on('click', function() {
		var tabs = $(this).parents('.example-tabs');
		var examples = $(this).parents('.code-examples');
		tabs.find('li').removeClass('active');
		$(this).addClass('active');
		var panel_name = $(this).data('panel');
		examples.find('.panels .panel').removeClass('active');
		examples.find('.panels .panel.' + panel_name).addClass('active');
	});

});

