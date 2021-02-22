
Simple Form Validation Documentation
====================================

Intro
-----
Simple Form Validation is a collection of functions that makes form validation easier and more consistent.  See the end for usage examples.

This document is in Markdown format. It is strongly recommended to use the MarkDown Viewer plugin for Chrome ( https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk), or a text editor that supports the MD format, for optimal readability.

Requirements
------------
- jQuery v.1.2+ (not tested on earlier versions, but probably OK.)
- submitButtonID must be the ID of the form's submit button.
    + Alternatively, assign the ID "submitBtn" to the submit button.

Optional Config Vars
--------------------
- lineBreak = the default linebreak in error messages.
    + If using JS alert() it should be "\n"
    + If using HTML output (such as a modal window) use HTML tags: <br> <P>, etc.

Functions Reference
-------------------

### function disableButton(btnID,btnText)

- Adds "disabled" to the element with the id __btnid__  
- Changes the html of __btnId__ to __btnText__  
- returns null

### function enableButton(btnID,btnText)

- Removes "disabled" from the element with the id __btnid__  
- Changes the html of __btnId__ to __btnText__  
- returns null

### function errorOut(fieldname, message)

- Adds class "error" to input, select, or textarea with *name* attribute __fieldname__
- If the field is a checkbox or radio, it adds .error to its parent .form-group
- Gives an alert() containing __message__
- enables the submit button  (defined by submitButtonID1)

### function fieldsHaveValue(fieldsToValidate){
- Accepts an array of field names and readable labels, then validates each to ensure they have values.
- __fieldsToValidate__ must be an array in the following format:
    + KEY(index) is the NAME of the form field.
    + Value is the human-readable label (used to display in the error message)
    + ex:  fieldsToValidate = [ "fname": "Your first name", "add1": "Your Mailing Address"];
- retruns false and gives an alert() with a list of fields that are blank.
- returns true if all fields have values.


### function twoValuesMatch(field1, field2, ignorecase=false)
- Validates that values of __field1__ and __field2__ match.  optional __ignorecase__ will, of course, ignore case.
- returns boolean.

### function validateEmail(fieldname)
- validates value of __fieldname__ looks like an email
- returns boolean.

### function isValidPhoneNumber(fieldname)
- Make sure Phone numbers are valid U.S./North American phone numbers
- leading 1 is optional
- returns boolean.

### function isValidDate(fieldName,format="mm/dd/yyyy")
- Ensure a date is valid.
- optional ___format___ possible values:
    +  "mysql"  = YYYY-MM-DD format
    +  or default "mm/dd/yyyy"

### function isValidZipCode(zipFieldName)
- Validates a ZIP code is a valid North American (US/CA/MX) code.
- returns boolean.

### function validateLength(fieldname, min, max=false)
- Validates the value of __fieldname__ is at least __min__ characters long and at most __max__ characters.
- __max__ is ooptional.
- returns boolean

### function stringDoesNotInclude(regex,fieldname)
- validates __fieldname__ does not match __regex__
- __regex__ must be a regex object, not a string.
- returns boolean.

### function stringIncludes(regex,fieldname){
- validates __fieldname__ contains __regex__
- __regex__ must be a regex object, not a string.
- returns boolean.

### function stringContainsURL(fieldname){
- returns true if the value of __fieldname__ contains a url. False otherwise.

### function passwordStrengthIsBad(fieldname, requirements, linebr)
- retruns a string containing an error message if any of the __requirements__ are not met.
- __requirements__ must be an array and may contain at least one of the following strings:
    + mustHaveSpecial
    + mustHaveLetter
    + mustHaveUpperCase
    + mustHaveLowerCase
    + mustHaveNumber
- default value if __requirements__ is not given, is ['mustHaveLetter']
- linebr is what to use for line breaks: \n unix style or <br /> HTML.  default is "<br/>"
- returns FALSE if value of __fieldname__ meets all of the given requirements.

### function cctest(cc)
- Validates a Credit Card number is real
- Returns "A" (Amex), "V" (Visa), "M" (MasterCard), or "D" (Discover) if the number given is a valid credit card number.
- Returns false if not.
- NOTE: __cc__ must be a string containing the credit card number, not a fieldname.

### function boxIsChecked(fieldname){
- Returns true if a checkbox named __fieldname__ is checked, or false otherwise.


Sample Bare-Bones Usage
-----------------------
This barebones example shows the minimum required to get you up and running:

Your <FORM> tag must call the validateForm function on submit:
```
 <form action="" method="post" onsubmit="return validateForm()"
```

Your Submit button should have the ID "submitBtn" OR, you can define it using the submitButtonID variable in the JS.
```
  <button type="submit" id="submitBtn">
```

The Javascript:
```
<script src = "/js/validation-utilities.min.js"></script>
<script>
    submitButtonID = "submitBtn"; // the ID (not the name) of the submit button.
    var fieldsToValidate = { // names of all form fields you want to ensure have a value.
        // Key = NAME of the form field; Value = readable label (to display in the errmsg)
        "firstName":        "First Name",
        "lastName":         "Last Name"
    }
    function validateForm(){
        disableButton(submitButtonID); // prevents double-tapping

        // Checks that all inputs in the fieldsToValidate array have values
        if(!fieldsHaveValue(fieldsToValidate)) return false;

        // else if it gets here, everything checked out OK.
        return true;
    }
</script>
```

Example usage
-------------
See a working example of this at: https://apps.bearcaremedical.com/dev/validation-samples.html

Also Recommended
----------------
Two additional tools that are highly recommended to go along with this script.

doModal v1.2
- Pops up a Bootstrap Modal window.  Can be used instead of the browser-native javascript alert()
- Latest minified version at /js/doModal.min.js
- (Requires both Bootstrap.js and jQuery)

jQuery Mask
- Allows you to control the format of your input, such as forcing phone numbers to a certain format
- Minified version at /js/jquery.mask.js
- (Requires jQuery)
