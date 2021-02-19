$(".be-formcheck").attr({
    "onsubmit": "return formCheck(this)",
    "novalidate": "novalidate"
});

$(".be-formcheck input, .be-formcheck textarea, .be-formcheck select").not('input[type="hidden"]').each(function(i, tag) {
    $(tag).before('<div class="form-error">');
    if ($(tag).attr("required") === "required" && $(tag).attr("placeholder")) {
        $(tag).attr("placeholder", $(tag).attr("placeholder") + "*");
    }
    if ($(tag).attr("required") === "required" && $(tag).val() === null) {
        $(tag).children().first().html($(tag).children().first().html() + "*");
    }
});

$(".form-error").css("color", "red").hide();

function formCheck(form) {
    formError = false;
    $('.be-formcheck input, .be-formcheck textarea, .be-formcheck select').not('input[type="hidden"]').css("border-color", "black");
    $('.be-formcheck[name="'+form.name+'"] input, .be-formcheck[name="'+form.name+'"] textarea, .be-formcheck[name="'+form.name+'"] select').not('input[type="hidden"]').each(function(i, tag) {
        if ($(tag).attr("required") === "required" && ($(tag).val() === "" || $(tag).val() === null)) {
            $(tag).css("border-color", "red").siblings().html($('.be-formcheck[name="'+form.name+'"]').attr("data-error-msg")).slideDown();
            formError = true;
        } else {
			$(tag).siblings().slideUp().empty();
		}
    });
    if (formError) {
        return false;
    }
}
