var CURRENT_URL = window.location.href.split('#')[0].split('?')[0],
    $BODY = $('body'),
    $SIDEBAR_MENU = $('.sidebar-menu'),
    $SIDEBAR_FOOTER = $('.sidebar-footer');
	
// Sidebar
function init_sidebar() {
    $SIDEBAR_MENU.find('a').on('click', function(ev) {
        var $li = $(this).parent();

        if ($li.is('.active')) {
            $li.removeClass('active');
            $('ul:first', $li).slideUp();
        } else {
            // prevent closing menu if we are on child menu
            if (!$li.parent().is('.treeview-menu')) {
                $SIDEBAR_MENU.find('li').removeClass('active');
                $SIDEBAR_MENU.find('li ul').slideUp();
            }else
            {
				if ( $BODY.is( ".nav-sm" ) )
				{
					$SIDEBAR_MENU.find( "li" ).removeClass( "active" );
					$SIDEBAR_MENU.find( "li ul" ).slideUp();
				}
			}
            $li.addClass('active');

            $('ul:first', $li).slideDown();
        }
    });

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('active');

	$SIDEBAR_MENU.find('a').filter(function () {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('active').parents('ul').slideDown().parent().addClass('active');
}
// /Sidebar

$(function(){
    init_sidebar();
});