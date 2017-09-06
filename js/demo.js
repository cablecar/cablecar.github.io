window.addEvent('domready', function() {
	$('accordion').setStyle('display', '');
	
	//create our Accordion instance
	var myAccordion = new Accordion($('accordion'), 'h1.toggler', 'div.element', {
		opacity: false,
		onActive: function(toggler, element){
			toggler.addClass(element.id + '_expanded');
			toggler.removeClass(element.id + '_collapsed');
		},
		onBackground: function(toggler, element){
			toggler.removeClass(element.id + '_expanded');
			toggler.addClass(element.id + '_collapsed');
		}
	});

});