let validation = {
    validationName: function validationName(name) {
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
    },
    validationId: function validationId(id) {
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
    },
    validationPhone: function validationPhone(phone) {
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
    },
    validationEmail: function validationEmail(email, role, nowEmail) {
        let error = null;
        let emailValid =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        error = emailValid.test(email) ? error : "אימייל לא תקני, הזן שוב";
        return error;
    },
    validationLicense_number: function validationLicense_number(
        license_number
    ) {
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
    },
    validationAge: function validationAge(age) {
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
    },
    validationPassword: function validationPassword(password) {
        if (password.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationConfirmPassword: function validationConfirmPassword(
        confirmpassword,
        lastPassword
    ) {
        if (confirmpassword.length === 0) {
            return "שדה זה נדרש";
        }
        if (confirmpassword !== lastPassword) {
            return "סיסמאות לא זהות";
        }
        return null;
    },
    validationUExistsEmail: function validationUExistsEmail(cemail, cpassword) {
        let bool = false;
        let user1;
        const answer1 = { valid1: null, user: user1 };
        if (cemail.length === 0) {
            return { valid1: "שדה זה נדרש", user: null };
        }

        Data.users.forEach((u) => {
            if (u.email === cemail && u.password === cpassword) {
                localStorage.setItem("user", JSON.stringify(u));
                answer1.user = u;
                bool = true;
            }
        });
        if (bool) {
            return answer1;
        }
        return { valid1: "שם משתמש או סיסמא שגויים", user: null };
    },
    validationUExistsPassword: function validationUExistsPassword(cpassword) {
        return null;
    },
    validationGExistsEmail: function validationGExistsEmail(gemail, gpassword) {
        let bool = false;
        let user;
        const answer = { valid: null, user: user };
        if (gemail.length === 0) {
            return { valid: "שדה זה נדרש", user: null };
        }

        Data.guides.forEach((u) => {
            if (u.email === gemail && u.password === gpassword) {
                localStorage.setItem("user", JSON.stringify(u));
                answer.user = u;
                bool = true;
            }
        });
        if (bool) {
            return answer;
        }
        return { valid: "שם משתמש או סיסמא שגויים", user: null };
    },
    validationGExistsPassword: function validationGExistsPassword() {
        return null;
    },
    validationNameMeet: function validationNameMeet(namemeet) {
        if (namemeet.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationDate: function validationDate(date) {
        if (date.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationTime: function validationTime(time) {
        if (time.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationArea: function validationArea(area) {
        if (area.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationAbout: function validationAbout(about) {
        if (about.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationWay: function validationWay(way) {
        if (way.length === 0) {
            return "שדה זה נדרש";
        }
        return null;
    },
    validationMap: function validationMap(map) {
        if (map.length === 0) {
            return "שדה זה נדרש";
        }
        if (validator.isURL(map)) {
            return null;
        }
        return "הזנת קישור שגוי";
    },
    validationSrc: function validationSrc(src) {
        if (validator.isURL(src)) {
            return null;
        }
        return "הזנת קישור שגוי";
    },
    validationCreateMeet: function validationCreateMeet(
        date,
        time,
        namemeet,
        id
    ) {
        Data.meets.forEach((i) => {
            if (
                i.idguide === id &&
                Math.abs(
                    new Date(date + " " + time) -
                        new Date(i.date + " " + i.time)
                ) < 14400000
            ) {
                return "קיים לך כבר מפגש בטווח הזמן של 4 שעות מפגש זה";
            }

            if (i.date === date && i.time === time && i.namemeet === namemeet) {
                return "קיים כבר מפגש באזור זה, ביום ובשעה שהזנת.";
            }
        });

        return null;
    },
};

module.exports = validation;
