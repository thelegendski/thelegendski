/** 
 * This code has been assembled as an example of how to bot for the Guardians.
*/

/** This is a node.js file
 * To run, you need node installed. 
 * You also need node-fetch and fs installed via npm (node package manager)
 * You also need my farmPointsNode.js file in the same folder as this file [ski: I have attached this file]
*/

//Import fetch
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//Import fs
const fs = require("fs");
//Import my farming points code
const completeVideo = require("./farmPointsNode.js");


/**
 * A ton of this is left over from my early days of learning requests and stuff
 * Most is actually not needed as I found out later =P
 * But hey, it works, so not going to mess with it
*/
var universalPassword = "Password Here";
var globalFkey = "1.0_3ide19qcn3t8r15t344q3hnou0r1ca3mvd2io72u3159eca2g44n2681319g2f3raiv_1660872974870";
var gKAAL = "$aVRhIu1sbiOYEiof3xaVnqougxVVF-hVfisjeRtdkvQ.~rgd7ey$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ*";
var gKAAC = "$X_Js6tve1g12VW2RcbIEUCeixwNdWt8MCb9efLozMtQ.~rgd7ey$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ*$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ!0!0!0~2";
var gKAAS = "MAktR9vSKOokhiSY4RGydQ";
var gKAVID = "a0134981-be95-4eb0-9047-b1be2546b7fc";
var gGOOGAPPUID = "xCgsIBBDhBSDKhcuXBg";
var globalAuthCookies = `KAAC=${gKAAC};KAAL=${gKAAL};fkey=${globalFkey};KAAS=${gKAAS};KAVID=${gKAVID};GOOGAPPUID=${gGOOGAPPUID}`;


/** Notes:
 * Throughout the code "account" typically is a string containing the accounts credentials
 * The important credentials are the token (the KAAS key), and the fkey which needs to be set to the same value as the x-ka-fkey header.
 * 
 * This code uses burner.kiwi tempmail, which has since been blocked on KA. Drained pays to use burner gmail accounts however, so this does not stop him.
 * Even if KA blocks all temp mail sites by the lists on github, I could self-host my own email server and cycle ips everytime it is blocked.
*/


/** 
 * This function takes the auth link from the email and authorizes it
*/
async function authByLink(link, email) {
    //try {
    if ( link.indexOf("token") === -1 ) return;
    //https://www.khanacademy.org/completesignup?token=token
    console.log("Verifying " + link);
    var token = link.substring(link.indexOf("=")+1);
    var account = await auth(email);
    var re = await (await 
        fetch("https://www.khanacademy.org/api/internal/graphql/populateCompleteSignup", {
            "headers": {
                "cookie": account,
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "x-ka-fkey": globalFkey
            },
            "body": `{\"operationName\":\"populateCompleteSignup\",\"variables\":{\"token\":\"${token}\",\"parent\":false},\"query\":\"mutation populateCompleteSignup($token: String, $inviteId: String, $parent: Boolean) {\\n  populateCompleteSignup(token: $token, inviteId: $inviteId, parent: $parent) {\\n    token\\n    inviteId\\n    hideGender\\n    isParent\\n    isTeacher\\n    isStudentInvite\\n    unverifiedUser {\\n      email\\n      nickname\\n      gender\\n      username\\n      __typename\\n    }\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
            "method": "POST",
        })
    );
    if (re.status !== 200) {
        console.log(await re.text());
    }
}

/** 
 * Next few functions have to do with generating emails, reading from those emails, etc.
*/
var activeEmails = [];
function getEmailAuthLinkText(text) {
    text = text.substring(text.indexOf("\r\n\r\n")+4);
    text = text.substring(0, text.indexOf("\r\n\r\n"));
    return text;
}
/** 
 * Create email for bot
*/
async function createEmail() {
    var newEmail = await (await 
        fetch("https://burner.kiwi/api/v2/inbox", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Chromium\";v=\"105\", \"Not)A;Brand\";v=\"8\"",
                "upgrade-insecure-requests": "1"
            },
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "omit"
        })
    ).json();
    try {
        var email = newEmail.result.email.address;
        var token = newEmail.result.token;
        var id = newEmail.result.email.id;
        activeEmails.push({email: email, id: id, token: token});
        return email;
    } catch (error) { console.log(error) }
}
/** 
 * Get emails sent to address
*/
async function getInbox(id, token) {
    var re = await fetch(`https://burner.kiwi/api/v2/inbox/${id}/messages`, {
    "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "en-US,en;q=0.9",
        "X-Burner-Key": token
    },
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
    });
    var json = await re.json();
    return json;
}
/** 
 * Authenticate all emails sent to the bots addresses 
*/
async function authAllAccounts() {
    try {
        while (activeEmails.length > 0) {
            var inbox = await getInbox(activeEmails[0].id, activeEmails[0].token);
            var emails = inbox.result;
            for (var i = 0; i < emails.length; i++) { //Check each email
                var email = emails[i];
                if (!email.subject.includes("signing")) { console.log(`Subject ${email.subject} does not match`) };
                var authLink = getEmailAuthLinkText(email.body_plain);
                console.log(email);
                await authByLink(authLink, activeEmails[0].email)
            }
            var email = activeEmails[0].email;
            fs.appendFile(saveLocG, email+"\n", function (err) {
                if (err) throw err;
                console.log(`Saved ${email}`);
            });
            activeEmails.shift();
            console.log("Shifted array, length is " + activeEmails.length);
            var stopHere = 0;
        }
    } catch (err) {
        console.log(err);
    }
}

/** Random strings are used for bot names, if I wanted to make it look more authentic I would use a large text file for first and last names like Drained does */
function rString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
/** Cookie strings are formatted like "cookie=smth; cookie2=smthElse;" so this extracts a cookie value s*/
function getCookie(cookies, name) {
    var cookie = cookies.substring(cookies.indexOf(name) + name.length + 1);
    cookie = cookie.substring(0, cookie.indexOf(";"));
    return cookie;
}
/** Wait for ms milliseconds */
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Khan interaction functions:
/** ReAuths the current account. Needed for username changes, account deletion */
async function reAuth(account) {
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/reauthWithPasswordMutation?curriculum=us-cc&lang=en&_=220810-1540-b55fcdc7dd33_1660174138904", {
        "headers": {
            "cookie": account,
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey
        },
        "body": `{\"operationName\":\"reauthWithPasswordMutation\",\"variables\":{\"password\":\"${universalPassword}\"},\"query\":\"mutation reauthWithPasswordMutation($password: String!) {\\n  reauthWithPassword(password: $password) {\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    await re.json(); //make sure it worked
    var token = getCookie(re.headers.get("set-cookie"), "reauth_token");
    return account += ";did_reauth=1;reauth_token="+token;
}
/** Create account with email and name, return the account */
async function createKhanAccount(email, firstName, lastName) {
    var firstName = firstName || rString( 10 );
    var lastName = lastName || rString(10);
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/signupLearnerWithPasswordMutation?lang=en", {
        "headers": {
            "cookie": globalAuthCookies,
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey
        },
        "body": `{\"operationName\":\"signupLearnerWithPasswordMutation\",\"variables\":{\"password\":\"${universalPassword}\",\"email\":\"${email}\",\"firstname\":\"${firstName}\",\"lastname\":\"${firstName}\",\"birthdate\":\"1972-01-01\"},\"query\":\"mutation signupLearnerWithPasswordMutation($email: String!, $password: String!, $firstname: String!, $lastname: String!, $birthdate: Date!) {\\n  signupLearnerWithPassword(email: $email, password: $password, firstname: $firstname, lastname: $lastname, birthdate: $birthdate) {\\n    user {\\n      id\\n      kaid\\n      canAccessDistrictsHomepage\\n      isTeacher\\n      hasUnresolvedInvitations\\n      transferAuthToken\\n      preferredKaLocale {\\n        id\\n        kaLocale\\n        status\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    return (await re.json());
}
/** As previously mentioned cookies are formatted a certain way, this puts the KAAS token into that format */
function authWithKAAS(KAAS) {
    var account = "fkey="+globalFkey+";KAAS="+KAAS+";";
    return account.replace(/\r?\n|\r/g, '');
}
/** 
 * Login (return credentials) to account with email and password. 
 * The password parameter defaults to the main password
 */
var auth = async (username, password=universalPassword) => {
    username = username.trim();
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/loginWithPasswordMutation?curriculum=us-cc&lang=en", {
        "headers": {
            "accept-language": "en-US,en;q=0.9",
            "x-ka-fkey": globalFkey,
            "cookie": `fkey=${globalFkey}`
        },
        "body": `{\"operationName\":\"loginWithPasswordMutation\",\"variables\":{\"identifier\":\"${username}\",\"password\":\"${password}\"},\"query\":\"mutation loginWithPasswordMutation($identifier: String!, $password: String!) {\\n  loginWithPassword(identifier: $identifier, password: $password) {\\n    user {\\n      id\\n      kaid\\n      canAccessDistrictsHomepage\\n      isTeacher\\n      hasUnresolvedInvitations\\n      transferAuthToken\\n      preferredKaLocale {\\n        id\\n        kaLocale\\n        status\\n        __typename\\n      }\\n      __typename\\n    }\\n    isFirstLogin\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    var json = await re.json();
    var KAAS = "";
    try {
        var cookies = re.headers.get("set-cookie").match(/(?<=(KAAL|KAAC|KAAS)\=)(.*?)(?=;)/gi);
        //KAAL and KAAC are two other tokens which are not really important
        //var KAAL = cookies[0];
        //var KAAC = cookies[1];
        KAAS = cookies[2];
        console.log( KAAS );
    } catch (e) {
        throw "Unable to get KAAS. JSON: " + JSON.stringify( json );
    }
    //account = `KAAC=${KAAC};KAAL=${KAAL};fkey=${globalFkey};KAAS=${KAAS};KAVID=${gKAVID};GOOGAPPUID=${gGOOGAPPUID}`;
    return `fkey=${globalFkey};KAAS=${KAAS};`;
}

/** 
 * Generate accounts. Code is commented
*/
async function generateAccounts(num, saveLoc) {
    try {
        //If save location has not been specified, save to "accounts"
        var saveLoc = saveLoc || "accounts";
        //Run for as many accounts as you said to create
        for (var i = num; i--;) {
            //Create email
            var email = await createEmail();
            //Generate name
            var firstName = rString( 10 );
            var lastName = rString(10);
            console.log(`Creating account with ${email}...`);
            //Create account
            await createKhanAccount( email, firstName, lastName );
            //Login
            console.log("Logging in...");
            var account = await auth(email);
            //Point farm account up to 5K ep
            console.log("Starting point farm...");
            await farmPointsUntil(account, 5000);
            //Typically as some requests are still finishing, the account gets more like 9K ep. This is also why I wait for 8 seconds.
            //Someone with better internet bandwidth could turn the sleep time down.
            console.log("Finished farming" + email);
            await sleep(8000);
        }
        //Wait for emails to send before authing to make sure they all come in
        console.log("Finished creating accounts, waiting for emails");
        await sleep(3_000);
        //authAllAccounts goes through each email, extracting the authentication link, then authorize it
        await authAllAccounts();
    } catch (err) {
        console.log(`Creating accounts stopped because of ${err}`);
        //throw err;
        //Still authenticate current accounts
        await authAllAccounts();
    }
}

/** 
 * Get the KA getFullUserProfile endpoint 
*/
async function getFullUserProfile(account) {
    re = await (await 
    fetch("https://www.khanacademy.org/api/internal/graphql/getFullUserProfile", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey,
            "cookie": account
        },
        "body": "{\"operationName\":\"getFullUserProfile\",\"query\":\"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    qualarooId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\\"can_do_what_only_admins_can_do\\\")\\n    isCurator: hasPermission(name: \\\"can_curate_tags\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isCreator: hasPermission(name: \\\"has_creator_role\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isPublisher: hasPermission(name: \\\"can_publish\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\\"can_moderate_users\\\", scope: GLOBAL)\\n    isParent\\n    isSatStudent\\n    isTeacher\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    autocontinueOn\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\\"can_ban_users\\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(name: \\\"can_send_moderator_messages\\\", scope: GLOBAL)\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    preferredKaLocale {\\n      id\\n      kaLocale\\n      status\\n      __typename\\n    }\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    tosAccepted\\n    shouldShowAgeCheck\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n}\\n\",\"variables\":{}}",
        "method": "POST",
    })
    ).json()//.data.user.points;
    return re.data.user;
}
/** 
 * Get the current account's ep number. Used to know when point farming is done 
 * */
async function checkPoints(account) {
    var re = await getFullUserProfile(account);
    return re.points;
}
/** 
 * `farmPointsUntil` will farm up to a certain amount of points.
 * This is done by repeatedly calling the farmPointsNode.js file
 * Each call tends to get around 30 points, iirc.
*/
async function farmPointsUntil(account, xp) {
    var under5K = true;
    while (under5K) {
        //Start fetch file 3 times then wait. If you have better bandwidth you can start more at once and get points faster.
        for (var i = 3; i--;) {
            completeVideo(globalFkey, account); }
        await sleep(2000);
        //Check if you have enough points
        var points = await checkPoints(account);
        if ( points > xp ) under5K = false;
        console.log( points );
    }
}
/** 
 * This is a function that has grow more and more complex overtime as I have needed to use it different ways.
 * It just runs the lambda code you input on each bot, passing in the account as a variable.
*/
async function forEachBot(file, numBots, code, start=0, ms=0, verbose=true, kaas=false) {
    var done = false;
    fs.readFile(file, 'utf8', async function(err, data) {
        if (err && verbose) { console.log(err); }
        var accounts = data.split("\n");
        for (var i = start; i < numBots+start && i < accounts.length; i++) {
            var failed = true;
            try {
                var account;
                if (kaas) {
                    account = authWithKAAS(accounts[i]);
                } else {
                    account = await auth( accounts[i] );
                }
                await code(account);
                failed = false;
            } catch(e) { numBots++; if (verbose) { 
                console.log("Failed to use bot " + i + " | " + e); }
            }
            if (!failed && verbose) console.log("Bot " + (i+start) + " finished");
            await sleep(ms);
        }
        done = true;
    });
    while (!done) { await sleep(500); }
}

/** 
 * Main function is an async iife so that `await` can be used
*/
(async function main () {
    console.log("Started");

    // This will generate accounts
    while (true) {
        try {
        await generateAccounts(1, "botSaveFile.txt", true);
        } catch (err) {
            //On an error, wait 20 seconds then continue so you don't have to be here monitoring the program for ratelimits and stuff
            console.log(err);
            await sleep(20_000)
        } 
    }
})();
