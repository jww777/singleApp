function bsStep(i) {
    $('.steps').find("li[data-step]").removeClass("complete");
	$('.steps').find("li[data-step]").each(function() {
		var $this = $(this);
		if (parseInt($this.attr("data-step"), 10) <= i) {
            $this.addClass("complete");
        }
	})
}