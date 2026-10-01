const API_BASE = "/api";


// ================= QUICK EXIT =================

function quickExit() {
    window.location.replace("https://www.google.com");
}


// ================= SECTION SCROLL =================

function showSection(id) {
    const el = document.getElementById(id);

    if (el) {
        el.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ================= MODAL =================

function openModal(title, text) {

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("modalText").innerText = text;
    document.getElementById("modal").style.display = "flex";
}


function closeModal() {
    document.getElementById("modal").style.display = "none";
}


window.onclick = function (e) {

    if (e.target === document.getElementById("modal")) {
        closeModal();
    }

};


// ================= EMERGENCY HELP =================

function showEmergency() {

    if (!navigator.geolocation) {

        openModal(
            "Emergency Help",
            "Location is not supported on this device."
        );

        return;
    }


    openModal(
        "Emergency Help",
        "Getting your current location..."
    );


    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;


            const locationLink =
                `https://www.google.com/maps?q=${latitude},${longitude}`;


            document.getElementById("modalTitle").innerText =
                "🚨 Emergency Help";


            document.getElementById("modalText").innerHTML = `

                <p style="font-size:16px;">
                    Your current location has been detected.
                </p>

                <a href="${locationLink}"
                   target="_blank"
                   style="
                   display:block;
                   background:#c91f3d;
                   color:white;
                   padding:12px;
                   border-radius:8px;
                   text-decoration:none;
                   margin:15px 0;
                   font-weight:bold;">
                   📍 Open My Location
                </a>

                <a href="tel:112"
                   style="
                   display:block;
                   background:#333;
                   color:white;
                   padding:12px;
                   border-radius:8px;
                   text-decoration:none;
                   margin:10px 0;
                   font-weight:bold;">
                   📞 Call Emergency Services (112)
                </a>

                <p style="
                   margin-top:18px;
                   font-size:14px;
                   color:#555;">
                   If you are in immediate danger, contact local
                   emergency services or a trusted person.
                </p>

            `;


            document.getElementById("modal").style.display = "flex";

        },


        function () {

            openModal(
                "Location Access Needed",
                "Please allow location access to use the Emergency Help feature."
            );

        },


        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );

}



// ================= LEGAL AWARENESS =================

function readMore(type) {

    const data = {

        protection: {

            title: "🛡️ Protection from Domestic Violence",

            text: `
Domestic violence can include physical, emotional, sexual or economic abuse.

In India, the Protection of Women from Domestic Violence Act, 2005
provides a legal framework for protection of women facing domestic violence.

Important:

• You do not have to face abuse alone.
• Keep important documents and evidence safely, when it is safe to do so.
• A trusted person may be informed if you feel safe doing so.
• For immediate danger, contact emergency services.

For current and case-specific legal guidance, consult an official
legal-aid service or qualified legal professional.
`
        },


        legal: {

            title: "⚖️ Legal Assistance",

            text: `
Legal aid means getting legal advice or assistance when a person
needs help understanding or accessing the legal system.

A person experiencing domestic violence may seek help from:

• Legal Services Authorities
• Legal-aid services
• Qualified lawyers
• Appropriate government authorities
• Women-support organisations

Legal assistance may help a person understand:

• Their available legal options
• How to seek appropriate protection
• Where and how to approach the relevant authority
• What documents or information may be useful

Free legal services may be available to eligible people through
the Legal Services Authorities system.

For current information, contact an official legal-aid service
or qualified legal professional.
`
        },


        process: {

            title: "📞 Support Process",

            text: `
If you are experiencing domestic violence or feel unsafe, you can
consider the following steps:

1. Identify a safe place

Try to move to a safe location if you believe you are in immediate danger.

2. Contact a trusted person

If it is safe to do so, inform a trusted family member or friend.

3. Seek appropriate help

You can approach appropriate authorities, women-support services,
legal-aid services or other reliable support organisations.

4. Get legal information

A legal-aid service or qualified legal professional can explain
the options that may be available.

5. In an emergency

If there is an immediate threat to your safety, contact the
appropriate emergency service.
`
        }

    };


    const selected = data[type] || data.protection;


    document.getElementById("modalTitle").innerText =
        selected.title;

    document.getElementById("modalText").innerText =
        selected.text;

    document.getElementById("modal").style.display = "flex";

}



// ================= UNDERSTANDING DOMESTIC VIOLENCE =================

function readViolence(type) {

    const data = {

        physical: {

            title: "🛑 Physical Violence",

            text: `
Physical violence involves actions that cause or may cause
physical injury or harm.

Examples:

• Hitting, pushing or kicking
• Slapping or punching
• Throwing objects at someone
• Causing physical injury
• Threatening physical harm

Physical violence can be serious even if an injury is not visible.

If you feel that you are in immediate danger, move to a safe place
when possible and seek appropriate emergency assistance.
`
        },


        emotional: {

            title: "💬 Emotional Abuse",

            text: `
Emotional abuse involves repeated behaviour that can cause fear,
distress, humiliation or loss of confidence.

Examples:

• Repeated insults or humiliation
• Threatening or intimidating behaviour
• Controlling who someone can talk to
• Constantly blaming or criticizing someone
• Making someone feel afraid or worthless

Emotional abuse may not leave visible injuries, but it can still
have a serious impact on a person's wellbeing.

If you feel unsafe, consider speaking with a trusted person
or an appropriate support service.
`
        },


        financial: {

            title: "💰 Financial Abuse",

            text: `
Financial abuse involves controlling or restricting another
person's access to money or financial resources.

Examples:

• Taking someone's money without permission
• Restricting access to money
• Controlling income or bank accounts
• Preventing someone from working
• Creating financial dependence

Keep important financial information secure when it is safe to do so.

Legal or support services can provide guidance based on the
individual situation.
`
        },


        digital: {

            title: "📱 Digital Abuse",

            text: `
Digital abuse involves using technology to monitor, threaten,
harass or control another person.

Examples:

• Repeated unwanted messages or calls
• Monitoring phone or online activity
• Accessing accounts without permission
• Sharing private information or images without consent
• Online threats or harassment

Consider using strong passwords, privacy settings and
two-factor authentication where appropriate.

If you believe your device or accounts are being monitored,
seek trusted technical or professional assistance.
`
        }

    };


    const selected = data[type];


    if (!selected) {
        return;
    }


    document.getElementById("modalTitle").innerText =
        selected.title;

    document.getElementById("modalText").innerText =
        selected.text;

    document.getElementById("modal").style.display = "flex";

}



// ================= HELP =================

function showHelp(type) {

    const result = document.getElementById("helpResult");


    const helpData = {

        emergency: {

            icon: "🚨",

            title: "Emergency Help",

            text: "If you are in immediate danger, seek emergency assistance.",

            buttons: `
                <a href="tel:112"
                   class="help-action emergency-action">
                    📞 Call Emergency Services (112)
                </a>

                <button class="help-action location-action"
                        onclick="showEmergency()">
                    📍 Get My Location
                </button>
            `
        },


        legal: {

            icon: "⚖️",

            title: "Legal Help",

            text: "For legal assistance, seek guidance from appropriate legal-aid services and authorities.",

            buttons: `
                <a href="#legal"
                   class="help-action">
                    ⚖️ View Legal Awareness
                </a>
            `
        },


        emotional: {

            icon: "🧠",

            title: "Emotional Support",

            text: "Talking to a trusted person or qualified support professional can help when someone is feeling overwhelmed or unsafe.",

            buttons: `
                <a href="#support"
                   class="help-action">
                    🤝 View Support Services
                </a>
            `
        },


        medical: {

            icon: "🏥",

            title: "Medical Help",

            text: "For injuries or urgent medical needs, seek appropriate medical care or emergency assistance.",

            buttons: `
                <a href="tel:112"
                   class="help-action emergency-action">
                    📞 Emergency Assistance (112)
                </a>

                <a href="#support"
                   class="help-action">
                    🏥 View Support Services
                </a>
            `
        }

    };


    const help = helpData[type];


    if (!help) {
        return;
    }


    result.innerHTML = `

        <div class="help-result-card">

            <div class="help-result-icon">
                ${help.icon}
            </div>

            <h3>
                ${help.title}
            </h3>

            <p>
                ${help.text}
            </p>

            <div class="help-actions">
                ${help.buttons}
            </div>

        </div>

    `;


    result.style.display = "block";

}



// ================= SUPPORT SERVICES =================

async function loadSupport() {

    const grid = document.getElementById("supportGrid");


    try {

        const res = await fetch(API_BASE + "/support");

        const data = await res.json();


        if (!data.success) {
            throw new Error();
        }


        grid.innerHTML = data.services.map(s => `

            <div class="support-card">

                <span>
                    ${
                        s.service_type === "Emergency"
                        ? "🚨"
                        : s.service_type === "Legal"
                        ? "⚖️"
                        : "🤝"
                    }
                </span>


                <h3>
                    ${escapeHTML(s.service_name)}
                </h3>


                <p>
                    ${escapeHTML(
                        s.description || "Support information."
                    )}
                </p>


                ${
                    s.phone
                    ? `
                        <p>
                            <strong>Phone:</strong>

                            <a href="tel:${escapeAttr(s.phone)}"
                               style="
                               color:#b31258;
                               font-weight:bold;
                               text-decoration:none;">

                                📞 ${escapeHTML(s.phone)}

                            </a>
                        </p>
                    `
                    : ""
                }


                ${
                    s.website &&
                    s.service_name.toLowerCase().includes("legal")
                    ? `
                        <a href="${escapeAttr(s.website)}"
                           target="_blank"
                           rel="noopener">

                            Visit →

                        </a>
                    `
                    : ""
                }

            </div>

        `).join("");


    } catch (e) {

        grid.innerHTML = `

            <div class="support-card">

                <span>ℹ️</span>

                <h3>
                    Support Information
                </h3>

                <p>
                    Support services could not be loaded.
                    Please check that the backend and database are running.
                </p>

            </div>

        `;

    }

}



// ================= PERSONAL NOTES =================

function saveNote() {

    const date =
        document.getElementById("noteDate").value;

    const note =
        document.getElementById("noteText").value.trim();

    const status =
        document.getElementById("noteStatus");


    if (!date || !note) {

        status.innerText =
            "Please enter a date and note.";

        return;
    }


    const notes =
        JSON.parse(
            localStorage.getItem("saharaNotes") || "[]"
        );


    notes.push({
        date: date,
        text: note
    });


    localStorage.setItem(
        "saharaNotes",
        JSON.stringify(notes)
    );


    document.getElementById("noteText").value = "";


    status.innerText =
        "Note saved on this device.";


    displayNotes();

}



function deleteNote(index) {

    const notes =
        JSON.parse(
            localStorage.getItem("saharaNotes") || "[]"
        );


    notes.splice(index, 1);


    localStorage.setItem(
        "saharaNotes",
        JSON.stringify(notes)
    );


    displayNotes();

}



function displayNotes() {

    const notes =
        JSON.parse(
            localStorage.getItem("saharaNotes") || "[]"
        );


    const box =
        document.getElementById("savedNotes");


    box.innerHTML = "";


    notes.forEach((n, i) => {

        const div =
            document.createElement("div");


        div.className = "saved-note";


        div.innerHTML = `

            <strong>
                ${escapeHTML(n.date)}
            </strong>

            <p>
                ${escapeHTML(n.text)}
            </p>

            <button onclick="deleteNote(${i})">
                Delete
            </button>

        `;


        box.appendChild(div);

    });

}



// ================= SECURITY HELPERS =================

function escapeHTML(text) {

    const d =
        document.createElement("div");

    d.innerText =
        String(text);

    return d.innerHTML;
}


function escapeAttr(text) {

    return String(text)
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;");
}



// ================= START =================

displayNotes();
loadSupport();
// ================= LOGIN SYSTEM =================

// SEND OTP
async function sendLoginOTP() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const message =
        document.getElementById("loginMessage");

    const otpSection =
        document.getElementById("otpSection");

    if (!email) {
        message.innerText = "Please enter your email.";
        return;
    }

    message.innerText = "Sending OTP...";

    try {

        const response = await fetch(
            "/api/send-login-otp",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            message.innerText =
                "OTP sent to your email. Please check your inbox.";

            otpSection.style.display = "block";

        } else {

            message.innerText =
                data.message || "OTP send failed.";
        }

    } catch (error) {

        console.error(error);

        message.innerText =
            "Backend connection failed.";
    }
}


// ================= VERIFY OTP =================

async function verifyLoginOTP() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const otp =
        document.getElementById("loginOTP").value.trim();

    const message =
        document.getElementById("loginMessage");

    if (!otp) {
        message.innerText = "Please enter the OTP.";
        return;
    }

    if (otp.length !== 6) {
        message.innerText = "Please enter the 6-digit OTP.";
        return;
    }

    message.innerText = "Verifying OTP...";

    try {

        const response = await fetch(
            "/api/verify-login-otp",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    otp: otp
                })
            }
        );

        const data = await response.json();

        if (data.success) {

            message.innerText =
                "Login successful!";

            // Login save
            localStorage.setItem(
                "saharaLoggedIn",
                "true"
            );

            // Login screen hide
            document.getElementById(
                "loginScreen"
            ).style.display = "none";

            // Main website show
            document.getElementById(
                "mainWebsite"
            ).style.display = "block";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            message.innerText =
                data.message || "Invalid OTP.";
        }

    } catch (error) {

        console.error(error);

        message.innerText =
            "Backend connection failed.";
    }
}


// ================= LOGIN STATE =================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        const loggedIn =
            localStorage.getItem(
                "saharaLoggedIn"
            );

        if (loggedIn === "true") {

            document.getElementById(
                "loginScreen"
            ).style.display = "none";

            document.getElementById(
                "mainWebsite"
            ).style.display = "block";

        } else {

            document.getElementById(
                "loginScreen"
            ).style.display = "flex";

            document.getElementById(
                "mainWebsite"
            ).style.display = "none";
        }
    }
);
// ================= LOGOUT =================

function logoutSahara() {

    // Login remove
    localStorage.removeItem("saharaLoggedIn");

    // Login screen show
    document.getElementById("loginScreen").style.display = "flex";

    // Main website hide
    document.getElementById("mainWebsite").style.display = "none";

    // Login fields clear
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginOTP").value = "";

    document.getElementById("otpSection").style.display = "none";

    document.getElementById("loginMessage").innerText = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// ======================================================
//              SAHARA ONE-TAP SOS SYSTEM
//              NO TWILIO REQUIRED
// ======================================================


// ================= TRUSTED CONTACTS =================

function saveTrustedContacts() {

    const contacts = [];

    for (let i = 1; i <= 3; i++) {

        const name =
            document.getElementById("contactName" + i).value.trim();

        const phone =
            document.getElementById("contactPhone" + i).value.trim();

        if (name && phone) {

            contacts.push({
                name: name,
                phone: phone
            });

        }
    }

    if (contacts.length === 0) {

        document.getElementById("contactMessage").innerText =
            "Please add at least one trusted contact.";

        return;
    }

    localStorage.setItem(
        "saharaTrustedContacts",
        JSON.stringify(contacts)
    );

    document.getElementById("contactMessage").innerText =
        contacts.length + " trusted contact(s) saved successfully.";
}


// ================= LOAD CONTACTS =================

function loadTrustedContacts() {

    const saved =
        localStorage.getItem("saharaTrustedContacts");

    if (!saved) return;

    const contacts = JSON.parse(saved);

    contacts.forEach((contact, index) => {

        const number = index + 1;

        const nameInput =
            document.getElementById("contactName" + number);

        const phoneInput =
            document.getElementById("contactPhone" + number);

        if (nameInput && phoneInput) {

            nameInput.value = contact.name;
            phoneInput.value = contact.phone;

        }
    });
}


// ================= START SOS =================

function startSOS() {

    const result =
        document.getElementById("sosResult");

    const status =
        document.getElementById("sosStatus");

    const locationBox =
        document.getElementById("sosLocation");

    result.style.display = "block";

    status.innerText =
        "📍 Getting your current location...";

    locationBox.innerHTML = "";

    if (!navigator.geolocation) {

        status.innerText =
            "Location is not supported by this browser.";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;

            const mapLink =
                "https://www.google.com/maps?q="
                + latitude
                + ","
                + longitude;

            status.innerText =
                "✅ Emergency information prepared.";

            locationBox.innerHTML = `

                <div class="location-box">

                    <strong>📍 Your Current Location</strong>

                    <p>
                        Latitude: ${latitude.toFixed(6)}
                        <br>
                        Longitude: ${longitude.toFixed(6)}
                    </p>

                    <a
                        href="${mapLink}"
                        target="_blank"
                    >
                        🗺️ Open Location in Google Maps
                    </a>

                </div>

            `;

            // Store latest emergency location
            localStorage.setItem(
                "saharaEmergencyLocation",
                mapLink
            );

        },

        function(error) {

            console.error(error);

            status.innerText =
                "⚠️ Location permission was not granted.";

            locationBox.innerHTML = `
                <p>
                    Please allow location permission
                    to share your emergency location.
                </p>
            `;

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}


// ================= CALL 112 =================

function callEmergency() {

    window.location.href = "tel:112";

}


// ================= SHARE EMERGENCY =================

async function shareEmergency() {

    const location =
        localStorage.getItem(
            "saharaEmergencyLocation"
        );

    if (!location) {

        alert(
            "Please activate SOS first so your location can be prepared."
        );

        return;
    }


    const message =
`🚨 SAHARA EMERGENCY ALERT

I may need help.

My current location is:
${location}

Please contact me immediately.`;



    // Native phone sharing

    if (navigator.share) {

        try {

            await navigator.share({

                title: "SAHARA Emergency Alert",

                text: message

            });

        } catch (error) {

            console.log(
                "Share cancelled."
            );

        }

    } else {

        // Fallback

        const whatsappURL =
            "https://wa.me/?text="
            + encodeURIComponent(message);

        window.open(
            whatsappURL,
            "_blank"
        );

    }
}


// ================= LOAD SAVED CONTACTS =================

window.addEventListener(
    "DOMContentLoaded",
    function () {

        loadTrustedContacts();

    }
);

