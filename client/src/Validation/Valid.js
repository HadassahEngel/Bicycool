import validator from "validator";

function validationName(name) {
    if (name.length === 0) {
        return "שדה זה נדרש";
    }
    if (typeof name !== "undefined") {
        if (name.match("^[A-Za-z\u0590-\u05FF ]+$")) {
            return null;
        }
        return "שם לא תקני, הזן שוב";
    }
    return "שם לא תקני, הזן שוב";
}
function validationId(id, role) {
    let error = null;
    if (id.length === 0) {
        error = "שדה זה נדרש";
    }
    if (!Number(id)) {
        error = "תעודת זהות לא תקנית, הזן שוב";
    } else if (id.length > 9 || id.length < 5) {
        error = "תעודת זהות לא תקנית, הזן שוב";
    }
    var sum = 0,
        NumberI;
    for (var i = 0; i < 9; i++) {
        NumberI = Number(id.charAt(i));
        NumberI *= (i % 2) + 1;
        if (NumberI > 9) NumberI -= 9;
        sum += NumberI;
    }
    if (sum % 10 === 0) {
    } else {
        error = "תעודת זהות לא תקנית, הזן שוב";
    }
    return error;
}
function validationPhone(phone) {
    if (phone.length === 0) {
        return "שדה זה נדרש";
    }
    if (!Number(phone)) {
        return "מספר טלפון לא תקני, הזן שוב";
    }
    if (phone.length > 10 || phone.length < 7) {
        return "מספר טלפון לא תקני, הזן שוב";
    }
    return null;
}
function validationEmail(email, role, nowEmail) {
    let error = null;

    if (email.length === 0) {
        error = "שדה זה נדרש";
    }
    let emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    error = emailValid.test(email) ? error : "אימייל לא תקני, הזן שוב";
    return error;
}
function validationLicense_number(license_number) {
    if (license_number.length === 0) {
        return "שדה זה נדרש";
    }
    if (!Number(license_number)) {
        return "מספר רשיון לא תקני, הזן שוב";
    }
    if (license_number.length === 8) {
        var sum_digit = 0,
            numberI;
        for (var i = 0; i <= 8; i++) {
            numberI = Number(license_number.charAt(i));
            sum_digit += numberI;
        }
        if (sum_digit % 10 === 0) {
            return null;
        }
        return "מספר רשיון לא תקני, הזן שוב";
    }
    return "מספר רשיון לא תקני, הזן שוב";
}

function validationAge(age) {
    if (age.length === 0) {
        return "שדה זה נדרש";
    }
    if (!Number(age)) {
        return "גיל לא תקני, הזן שוב";
    }
    if (age < 14) {
        return "חבל, גילך נמוך מדי... המתן לגיל 14";
    }
    if (age > 120) {
        return "האם אתה מצטרף אלינו מגן עדן?(; הזן שוב...";
    }
    return null;
}

function validationPassword(password) {
    if (password.length === 0) {
        return "שדה זה נדרש";
    }
    return null;
}

function validationConfirmPassword(confirmpassword, lastPassword) {
    if (confirmpassword.length === 0) {
        return "שדה זה נדרש";
    }
    if (confirmpassword !== lastPassword) {
        return "סיסמאות לא זהות";
    }
    return null;
}


function validationNameMeet(namemeet) {
  if (namemeet.length === 0) {
    return "שדה זה נדרש";
}
return null;
}

function validationDate(date) {
    if (date.length === 0) {
        return "שדה זה נדרש";
    }
    return null;
}

function validationTime(time) {
    if (time.length === 0) {
        return "שדה זה נדרש";
    }
    return null;
}

function validationArea(area) {
    if (area.length === 0) {
        return "שדה זה נדרש";
    }
    return null;
}

function validationAbout(about) {
    if (about.length === 0) {
        return "שדה זה נדרש";
    }
   return null;
}

function validationWay(way) {
  if (way.length === 0) {
    return "שדה זה נדרש";
}
return null;
}

function validationMap(map) {
    if (map.length === 0) {
        return "שדה זה נדרש";
    }
    if (validator.isURL(map)) {
        return null;
    }
    return "הזנת קישור שגוי";
}

function validationSrc(src) {
    if (validator.isURL(src)) {
        return null;
    }
    return "הזנת קישור שגוי";
}

function validationCreateMeet(date, time, namemeet, id) {
    return null;
}

export {
    validationName,
    validationId,
    validationPhone,
    validationEmail,
    validationLicense_number,
    validationAge,
    validationPassword,
    validationConfirmPassword,
    validationNameMeet,
    validationDate,
    validationTime,
    validationArea,
    validationAbout,
    validationWay,
    validationSrc,
    validationCreateMeet,
    validationMap,
};
