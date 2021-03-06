// Navigation

let count = 0;
let countTwo = 0;
let countThree;

// Expand destinations link

$(".expand-lg").click(function () {
    count += 1;
    $(".destination_expand").css("display", "flex");
    if (count % 2 == 0) {
        $(".destination_expand").css("display", "none");
    }
});

//Mobile Menu Expand

var mobileMenu = $(".mobile_menu-expand");
mobileMenu.width(0);
$(".menu-open").click(function () {
    $(".mobile-search").hide();
    $(".search-expand").show();
    $(".mobile_menu-content").css("margin-right", "auto");

    $(".level-one,.company-links").show();

    // Extend Width Of Menu To 100% When On Screen Size (< 480px)

    if ($(window).width() < 490) {
        $(mobileMenu).show().animate(
            {
                width: "100%",
            },
            175
        );
    } else {
        $(mobileMenu).show().animate(
            {
                width: "70%",
            },
            175
        );
    }
});

// Close Menu

$(".menu-exit").click(function () {
    $(mobileMenu).show().animate(
        {
            width: "0",
        },
        100
    );

    $(".level-one").toggle();
    $(".level-two,.submenus, .company-links").hide();
    $(".arrow-drop-lg, .arrow-drop-sm").removeClass("rotate");
});

// Menu Content Functionality


//First Level Expand

$(".level-one").click(function () {
    countTwo += 1;
    expandLevelTwo();
});


//Second Level Expand

function expandLevelTwo() {
    $(".arrow-drop-lg").addClass("rotate");
    $(".level-two").show();
    if (countTwo % 2 == 0) {
        $(".arrow-drop-lg,.arrow-drop-sm").removeClass("rotate");
        $(".level-two,.submenu").hide();
    }
}

//Third Level Expand

$(".first").click(function () {
    countThree = 0;
    countThree += 1;
    $(".second .submenu,.third .submenu").hide();
    $(".trigger-one").addClass("rotate");
    $(".trigger-two,.trigger-three").removeClass("rotate");
    $(this).find(".submenu").show();
    if (countThree % 2 == 0) {
        $(".trigger-one").removeClass("rotate");
        $(this).hide();
    }

});

$(".second").click(function () {
    countThree = 0;
    countThree += 1;
    $(".first .submenu,.third .submenu").hide();
    $(".trigger-two").addClass("rotate");
    $(this).find(".submenu").show();
    $(".trigger-one,.trigger-three").removeClass("rotate");

    if (countThree % 2 == 0) {
        $(".third").removeClass("rotate");
         $(this).hide();
    }

});

$(".third").click(function () {
    countThree = 0;
    countThree += 1;
    $(".first .submenu,.second .submenu").hide();
    $(".trigger-three").addClass("rotate");
    $(this).find(".submenu").show();
    $(".trigger-one,.trigger-two").removeClass("rotate");

    if (countThree % 2 == 0) {
        $(".trigger-three").removeClass("rotate");
         $(this).hide();
    }
});

// Expand Search Mobile

$(".search-expand").click(function () {
    $(this).hide();
    $(".mobile_menu-content").css("margin-right", "0");
    $(".mobile-search").css({ display: "flex", "align-items": "center" });
});

// Close Search Mobile

$(".search-hide").click(function () {
    $(".mobile-search").hide();
    $(".search-expand").show();
    $(".mobile_menu-content").css("margin-right", "auto");
});

// Typing Effect Homepage Hero Section

// Refrence W3Schools (https://www.w3schools.com/howto/howto_js_typewriter.asp)

$("document").ready(function () {
    var i = 0;
    var heroTxt =
        "Welcome to Adriatico Tours! Explore the best of Croatian tradition and culture";
    var speed = 45;

    function typeEffect() {
        if (i < heroTxt.length) {
            document.querySelector(".hero-section_intro").innerHTML += heroTxt.charAt(
                i
            );
            i++;
            setTimeout(typeEffect, speed);
        }
    }

    typeEffect();
});

// FAQ'S Dropodown Funcionality

let dropdownTrigger = $(".question-dropdown i");

// Show/Hide Answer and rotate plus sign

$(dropdownTrigger).click(function () {
    let paragraphState = $(this).prev().parent().children("p").css("display");

    if (paragraphState === "none") {
        $(this).css("transform", "rotate(-135deg)");
        $(this).prev().parent().children("p").show();
    } else if (paragraphState === "block") {
        $(this).css("transform", "rotate(90deg)");
        $(this).prev().parent().children("p").hide();
    }
});

// curency converter - API Taken From RAPID API 

// Make the API request

function retriveData(cb) {
    let data = null;
    const mainURL = "https://currency-converter13.p.rapidapi.com/convert?";

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", mainURL + `from=EUR&to=HRK&amount=1`);
    xhr.setRequestHeader(
        "x-rapidapi-key",
        "870f5e7b10msh733fa0ef06d059ap150e1bjsnb7f9d01379ca"
    );
    xhr.setRequestHeader(
        "x-rapidapi-host",
        "currency-converter13.p.rapidapi.com"
    );

    xhr.send(data);

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            cb(JSON.parse(this.responseText));
        }
    });
}

retriveData(function (data) {
    $(".convert-button, .convert-button-mobile").click(function () {
        let amountInput = $(".amount-input").val();
        let convertedResult = data.amount * amountInput;
        $("#converted-amount").val(convertedResult.toFixed(5));
    });
});

// Send Email - Email.js

function sendMail(contactForm) {
    emailjs
        .send("service_z13soh8", "contact_form", {
            from_fName: contactForm.fName.value,
            from_lName: contactForm.lName.value,
            from_email: contactForm.emailaddress.value,
            message: contactForm.message.value,
            phone_number: contactForm.phoneNumber.value,
        })


    return false;
}

// Inform User the message was sent

$(".submit-form").click(function () {
    $(".message-sent").fadeIn(100).delay(3200).fadeOut(300);
});

//Show Company Location On Google Maps

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("company-location"), {
        center: { lat: 53.37572, lng: -6.29603 },
        zoom: 16,
    });
    new google.maps.Marker({
        position: { lat: 53.37572, lng: -6.29603 },
        map,
    });
}
