//////// Validation Utility Functions v.1.1
// Created Dec 2020
var version=1.2,
updated="10 Feb 2021",
note="Latest source in /alexdev/js/";

var lineBreak = lineBreak || "<br>"; // default linebreak (for html vs unix-style.)
var submitButtonID = submitButtonID || "submitBtn";
// adds "disabled" attribute to and element, given its ID, and changes its text
function disableButton(btnID,btnText){
	// btnID = the ID of the button, not the name.
	// btnText = what to change it to when it's disabled
	btnText = btnText || "WAITING . . .";
	$("#"+btnID).attr("disabled", true);
	$("#"+btnID).html(btnText);
}
// removes "disabled" from an element, given its ID, and changes its text
function enableButton(btnID,btnText){
	// btnID = the ID of the button, not the name.
	// btnText = what to change it to when it's disabled
	btnText = btnText || "SUBMIT";
	$("#"+btnID).attr("disabled", false);
	$("#"+btnID).html(btnText);
}
// Add .error class to fieldname and pop up a modal window containing message
function errorOut(fieldname, message){
	$("input[name='"+fieldname+"']").addClass("error");
	$("select[name='"+fieldname+"']").addClass("error");
	$("textarea[name='"+fieldname+"']").addClass("error");
	// if it's a checkbox or radio, apply the .error class to its parent form-group
	if($("input[name='"+fieldname+"']").attr('type') == "radio" || $("input[name='"+fieldname+"']").attr('type') == "checkbox") {
		$("input[name='"+fieldname+"']").closest(".form-group").addClass("error");
	}
	alert(message);
	enableButton(submitButtonID,"SUBMIT");
	return false;
}
// Make sure all required fields have values.
function fieldsHaveValue(fieldsToValidate){
	// Accepts an array of field names and readable labels, then validates each to ensure they have values.
	// REQUIRED parameter fieldsToValidate.
	//		KEY(index) is the NAME of the form field.
	// 		Value is the human-readable label (used to display in the error message)
	// ex:  fieldaToValidate = [ "fname": "Your first name", "add1": "Your Mailing Address"];
	missingArray = [];
	$.each(fieldsToValidate, function(idx, val){
		thisItem = $("input[name='"+idx+"']");
		if(thisItem.attr("name") != undefined){ // If it has a name, then it is an <input> type
			$.trim(thisItem.val()); // Trim trailing whitespace
		}
		else thisItem = $("select[name='"+idx+"']"); // If not, then it must be a <select>
		thisItem.removeClass("error");
		if(thisItem.attr("type") == "checkbox"){
			if(thisItem.prop("checked") !== true){ // If it's a checkbox and not checked
				missingArray.push(val);
				// because a checkbox cannot have a border, this will outline the parent .form-group
				thisItem.closest(".form-group").addClass("error");
			}
		}
		else if(thisItem.attr("type") == "radio"){
			if($("input[name="+idx+"]:checked").length == 0){ // If it's a group of radios and none are checked
				missingArray.push(val);
				thisItem.closest(".form-group").addClass("error");
			}
		}
		else if(thisItem.val() == ""){ // Add all empty fields into an array
			missingArray.push(val);
			thisItem.addClass("error");
		}
	});
	if(missingArray.length !== 0){
		goBackAndFinish = " - " + missingArray.join(","+ lineBreak +" - ") + lineBreak;
		alert("ERROR: You missed some required fields. Please go back and fill in:" + lineBreak + goBackAndFinish);
		enableButton(submitButtonID);
		return false;
	}
	// if it got here, there were no problems.
	return true;
}
// Validate that two fields match
function twoValuesMatch(field1, field2, ignorecase=false){
	val1 = $("input[name='"+field1+"']").val();
	val2 = $("input[name='"+field2+"']").val();
	if(ignorecase) {
		val1 = val1.toLowerCase();
		val2 = val2.toLowerCase();
	}
	if(val1 != val2){
		return false;
	}
	return true;
}
// Make sure email is valid format
function validateEmail(fieldname){
	email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	if(!email_regex.test($("input[name='"+fieldname+"']").val())){
		return false;
	}
	return true;
}
// Make sure Phone numbers are valid U.S./North American phone numbers
function isValidPhoneNumber(fieldname){
	console.log("checking phone number")
	numToTest = $("input[name='"+fieldname+"']").val();
	phone_regex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
	if(!phone_regex.test(numToTest)){
		return false;
	}
	return true;
}
function isValidDate(fieldName,format="mm/dd/yyyy"){
	// Ensure a date is valid.
	// format may be "mysql" or "mm/dd/yyyy" others can be added as needed
	if(format == "mm/dd/yyyy") {
		var date_regex = /([0][1-9]|[1][0-2])\/([0-2][0-9]|[3][0-1])\/(20|19)\d{2}/gm;
	} else if(format == "mysql") {
		var date_regex = /(20|19)[0-9][0-9]\-[0-3][0-9]\-[0-9][0-9]/gm;
	}
	if(date_regex.test($("input[name='"+fieldName+"']").val())) return true
	else return false;
}
function isValidZipCode(zipFieldName) {
	// Make sure the ZIP code is a valid North American (US/CA/MX) code.
	us_zip_regex = /^[0-9]{5}(?:-?[0-9]{4})?$/;
	ca_zip_regex = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/
	if( !us_zip_regex.test($("input[name='"+zipFieldName+"']").val()) && !ca_zip_regex.test($("input[name='"+zipFieldName+"']").val())){
		return false;
	}
	return true;
}
// Validate a field is between min and max characters
function validateLength(fieldname, min, max=false){
	max = max || false;
	un = $("input[name="+fieldname+"]").val();
	if(un.length < min) return false;
	if(max){
		if(un.length > max) return false;
	}
	return true;
}
function stringDoesNotInclude(regex,fieldname){
	// regex value must be a regex object, not a string.
	un = $("input[name="+fieldname+"]").val();
	if(un>'') {
		newUN = un.replace(regex, "");
		if(un != newUN) return false;
	}
	return true;
}
function stringIncludes(regex,fieldname){
	// regex value must be a regex object, not a string.
	str = $("input[name="+fieldname+"]").val() || $("textarea[name="+fieldname+"]").val() ;
	if(str>"") {
		return regex.test(str);
	} else return false;
}
function stringContainsURL(fieldname){
	// returns TRUE if a field value contains a URL.
	url_regex = /((https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.)/i
	return stringIncludes(url_regex,fieldname);
}
function passwordStrengthIsBad(fieldname, requirements, linebr){
	// returns FALSE if value of fieldname meets all of the given requirements.
	// retruns a string containing an error message if any of the requirements are not met.
	// requirements must be an array and must contain at least one of the following:
	// 		mustHaveSpecial
	// 		mustHaveLetter
	// 		mustHaveUpperCase
	// 		mustHaveLowerCase
	//		mustHaveNumber
	requirements = requirements || ["mustHaveLetter"];
	// linebr is what to use for line breaks: \n unix style or <br /> HTML
	linebr = lineBreak || "<br />";
	// Make sure password is strong
	special_regex = /[\!\@\#\$\%\^\&\*\(\)+\-\=\[\]\{\}\\\?:;\.\,\|<>\/]/;
	lower_regex = /[a-z]/;
	upper_regex = /[A-Z]/;
	letters_regex = /[A-Za-z]/;
	num_regex = /[0-9]/;
	var passworderrors = [];
	if(requirements.includes("mustHaveSpecial") && !special_regex.test($("input[name='"+fieldname+"']").val())){
		passworderrors.push("At least one special character");
	}
	if(requirements.includes("mustHaveLetter") && !letters_regex.test($("input[name='"+fieldname+"']").val())){
		passworderrors.push("At least one letter");
	}
	if(requirements.includes("mustHaveLowerCase") && !lower_regex.test($("input[name='"+fieldname+"']").val())){
		passworderrors.push("At least one lowercase letter");
	}
	if(requirements.includes("mustHaveUpperCase") && !upper_regex.test($("input[name='"+fieldname+"']").val())){
		passworderrors.push("At least one capital letter");
	}
	if(requirements.includes("mustHaveNumber") && !num_regex.test($("input[name='"+fieldname+"']").val())){
		passworderrors.push("At least one number");
	}
	if(passworderrors.length > 0){
		return passworderrors.join(linebr);
	}
	else return false;
}
function cctest(cc){ // Checks card number and returns what type of card it is, or FALSE if invalid.
	cc = cc.replace(/\D/g,'');
	var visaregex = /^4[0-9]{12}(?:[0-9]{3})?$/,
	mcregex = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
	amexregex = /^3[47][0-9]{13}$/,
	discregex = /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/;
	if( visaregex.test(cc)) return ("V");
	if( mcregex.test(cc)) return ("M");
	if( discregex.test(cc)) return ("D");
	if( amexregex.test(cc)) return ("A");
	else return false;
}
function boxIsChecked(fieldname){
	if($("input[name='"+fieldname+"']").prop("checked")) {
		return true;
	}
	else return false;
}
/******************************************
**  CHANGELOG  **
v.1.2.
10 Feb 2021
	- Added default value "submitBtn" to global var submitButtonID if not given.
	- Fixed problem in errorOut() function.  "submitBtn" was hard-coded into the enableButton fn call. Changed to the var submitButtonID
v.1.2.
25 Jan 2021
	- Added var lineBr with default "<br>" to accommodate older forms that use alert() instead of doModal.

v.1.1
13 Jan 2021
	- Added StringContainsURL function
	- Added stringIncludes function
	- Added fieldsHaveValue function


/****/
