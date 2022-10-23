process.env.UV_THREADPOOL_SIZE=128
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require("fs");
const completeVideo = require("./farmPointsNode.js");
const videos = require("./videoDB.js");

// envs
// A ton of this is left over from my 
// early days of learning to bot, most is actually not needed I found out later =P
var universalPassword = "REDACTED PASSWORD TO ALL MY ACCOUNTS"; // Yes, I do use the same one for every account
var burnerEmailToken = ""; //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozMCwidXNlcm5hbWUiOiJSZWdpbmFsZCIsImlhdCI6MTY2MDE3MjQ3MCwiZXhwIjoxNjYwMjU4ODcwfQ.D8Hclszo_QwtFoi4nlnOJwMI0dvV-W_hgsLid1SNCrw";
var globalFkey = "1.0_3ide19qcn3t8r15t344q3hnou0r1ca3mvd2io72u3159eca2g44n2681319g2f3raiv_1660872974870";
var gKAAL = "$aVRhIu1sbiOYEiof3xaVnqougxVVF-hVfisjeRtdkvQ.~rgd7ey$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ*";
var gKAAC = "$X_Js6tve1g12VW2RcbIEUCeixwNdWt8MCb9efLozMtQ.~rgd7ey$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ*$a2FpZF8yODUxOTMyNDQ0MzQwMDYwNDkyOTg3OTQ!0!0!0~2";
var gKAAS = "MAktR9vSKOokhiSY4RGydQ";
var gKAVID = "a0134981-be95-4eb0-9047-b1be2546b7fc";
var gGOOGAPPUID = "xCgsIBBDhBSDKhcuXBg";
//var ggae_b_id = "!$YLcwBCAlVYSd7R_PhvZFl9u6bLn6dOAA0wsbF0WAN_Y.~rgevmh~1$a2FpZF82OTk3Mzg3MjM4ODU2ODg4OTgzODkzMjA4";
var globalAuthCookies = `KAAC=${gKAAC};KAAL=${gKAAL};fkey=${globalFkey};KAAS=${gKAAS};KAVID=${gKAVID};GOOGAPPUID=${gGOOGAPPUID}`;
// var globalAuthCookies = ``;
var gMinimalAuth = `KAVID=${gKAVID};fkey=${globalFkey};`;
//The logged in account's info:
//var account = ""; //logged in accounts cookies
var kaid = null; //of the logged in account
var saveLocG = "";
//END extra junk mostly not needed

var programGoal = [];

// Proxy servers (for rickroll prank, see later comments)
var proxies = []
var proxyIndex = 0;

//Notes
// globalAuthCookies and globalFkey are authorizations used for things not required to be logged in, such as logging in or creating accounts
// Everything else that needs auth needs to be account-specific cookies (`account`)

//Burner Mail
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
//---- Spoofmail - old ----
function getEmailAuthLink(emailJson) {
    var email = emailJson.text;
    email = email.substring(email.indexOf("\n\n")+2);
    email = email.substring(0, email.indexOf("\n\n"));
    return email;
}
async function authBurnerEmail() {
    var re = await fetch("https://spoofmail-lambda.herokuapp.com/api/auth/login", {
        "headers": {
            "accept": "application/json",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
        },
        "body": "{\"username\":\"Reginald\",\"password\":\"nevergonnagiveyouup\"}",
        "method": "POST",
    });
    burnerEmailToken = (await re.json()).token;
}
async function createEmailOld() {
    await authBurnerEmail();
    var newEmail = await (await 
        fetch("https://spoofmail-lambda.herokuapp.com/api/addresses", {
            "headers": {
                "accept": "application/json",
                "accept-language": "en-US,en;q=0.9",
                "authorization": burnerEmailToken,
                "content-type": "application/json",
            },
            "body": "{\"addresstag\":\"\"}",
            "method": "POST",
        })
    ).json();
    try {
        return newEmail.saved.addressname;
    } catch (error) { console.log(newEmail) }
}
async function nukeEmailJson(emailId) {
    await authBurnerEmail();
    return await (await 
        fetch("https://spoofmail-lambda.herokuapp.com/api/addresses/"+emailId, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": burnerEmailToken,
            },
            "method": "DELETE",
        })
    ).json();
}
async function getEmailsToEmailJson(emailId) {
    await authBurnerEmail();
    return await (await 
        fetch("https://spoofmail-lambda.herokuapp.com/api/messages/"+emailId, {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": burnerEmailToken,
            },
            "method": "GET",
        })
    ).json();
}
async function getEmailsJson() {
    await authBurnerEmail();
    return await (await 
        fetch("https://spoofmail-lambda.herokuapp.com/api/addresses", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "authorization": burnerEmailToken,
            },
            "method": "GET",
        })
        ).json();
}
async function clearBurnerEmails() {
    var result =  await getEmailsJson();
    for (var i = 0; i < result.length; i++) {
        var id = result[i].id;
        await nukeEmailJson(id);
    }
}
async function printlnAllEmails() {
    var result =  await getEmailsJson();
    for (var i = 0; i < result.length; i++) {
        var id = result[i].id;
        var emails = await getEmailsToEmailJson(id);
        console.log(emails);
    }
}
async function authAllAccountsOld() {
    var result =  await getEmailsJson();
    for (var i = 0; i < result.length; i++) {
        //try {
            var email = result[i].addressname;
            var id = result[i].id;
            var emails = await getEmailsToEmailJson(id);
            for (var j = 0; j < emails.length; j++) {
                var link = await getEmailAuthLink( emails[j] );
                await authByLink(link, email);
            }
        //} catch (e) { console.log("Failed; does account still exist?"); }
    }
    clearBurnerEmails();
}
//---- burner.kiwi ----
var activeEmails = [];
function getEmailAuthLinkText(text) {
    text = text.substring(text.indexOf("\r\n\r\n")+4);
    text = text.substring(0, text.indexOf("\r\n\r\n"));
    return text;
}
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

//Other stuff
function rString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getCookie(cookies, name) {
    var cookie = cookies.substring(cookies.indexOf(name) + name.length + 1);
    cookie = cookie.substring(0, cookie.indexOf(";"));
    return cookie;
}
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

// Khan
async function reAuth(account) { //ReAuths the current account. Needed for username changes, account deletion
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
    // console.log(await re.text());
    return (await re.json());
}
function authWithKAAS(KAAS) {
    var account = "fkey="+globalFkey+";KAAS="+KAAS+";";
    // console.log(account);
    return account.replace(/\r?\n|\r/g, '');
}
var auth = async (username, password=universalPassword)=>{
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
    //kaid = json.data.loginWithPassword.user.kaid;
    var KAAS = "";
    try {
        var cookies = re.headers.get("set-cookie").match(/(?<=(KAAL|KAAC|KAAS)\=)(.*?)(?=;)/gi);
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
async function generateAccounts(num, saveLoc, authEmails=true) {
    try {
        var saveLoc = saveLoc || "accounts";
        for (var i = num; i--;) {
            var email = await createEmail();
            var firstName = rString( 10 );
            var lastName = rString(10);
            console.log(`Creating account with ${email}...`);
            await createKhanAccount( email, firstName, lastName );
            console.log("Logging in...");
            var account = await auth(email);
            console.log("Starting point farm...");
                await farmPointsUntil(account, 5000); 
            //The former connect fills up the request queue or whatever it would be called so it does take a while here for it to empty
            //console.log("Setting username in 5 seconds...");
            //await sleep(5000);
            //await reAuth(account);
            //await setBasicInfo( rString(12), firstName + " " + lastName );
            console.log("Finished farming" + email);
            // fs.appendFile(saveLoc, email+"\n", function (err) {
            //     if (err) throw err;
            //     console.log(`Saved ${email}`);
            // });
            await sleep(8000);
        }
        //Wait for emails to send before authing
        if (authEmails) {
            console.log("Finished creating accounts, waiting for emails");
            await sleep(3_000);
            await authAllAccounts();
            // await clearBurnerEmails();
        }
    } catch (err) {
        console.log(`Creating accounts stopped because of ${err}`);
        throw err;
        if (authEmails) {
            await authAllAccounts();
            // await clearBurnerEmails();
        }
    }
}
async function generateAccountsIgnore(num, saveLoc, authEmails=true) { //Ignores errors and keeps on going
    while (true) {
        await generateAccounts(num, saveLoc, authEmails); }
}
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
async function checkPoints(account) {
    var re = await getFullUserProfile(account);
    return re.points;
}
async function farmPointsUntil(account, xp, nullAccount=false) {
    var under5K = true;
    while (under5K) {
        for (var i = 3; i--;) {
            completeVideo(globalFkey, account); }
        //console.log("Completed one round of videos");
        await sleep(2000);
        if (!nullAccount) {
            var points = await checkPoints(account);
            if ( points > xp ) under5K = false;
            console.log( points );
        }
    }
    //console.log("Done with videos");
}
async function getBadgesByVideos(start, num, account) {
    for (var i = start; i < num; i++) {
        var video = videos[i];
        var re = await fetch("https://www.khanacademy.org/api/internal/_mt/graphql/updateUserVideoProgress", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "x-ka-fkey": globalFkey,
                "cookie": account
            },
            "body":JSON.stringify({
                operationName:"updateUserVideoProgress",
                variables:{
                    input: {
                        "contentId": video[2],
                        "durationSeconds": video[1],
                        "lessonId": video[0],
                        "lastSecondWatched":video[1],
                        "secondsWatched": video[1],
                    }
                },
                query: "mutation updateUserVideoProgress($input: UserVideoProgressInput!) {\n  updateUserVideoProgress(videoProgressUpdate: $input) {\n    videoItemProgress {\n      content {\n        id\n        progressKey\n        ... on Video {\n          downloadUrls\n          __typename\n        }\n        __typename\n      }\n      lastSecondWatched\n      secondsWatched\n      lastWatched\n      points\n      started\n      completed\n      __typename\n    }\n    actionResults {\n      pointsEarned {\n        points\n        __typename\n      }\n      tutorialNodeProgress {\n        contentId\n        progress\n        __typename\n      }\n      userProfile {\n        countVideosCompleted\n        points\n        countBrandNewNotifications\n        __typename\n      }\n      notificationsAdded {\n        badges\n        avatarParts\n        readable\n        urgent\n        toast\n        continueUrl\n        __typename\n      }\n      ... on VideoActionResults {\n        currentTask {\n          id\n          content {\n            id\n            __typename\n          }\n          pointBounty\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    error {\n      code\n      debugMessage\n      __typename\n    }\n    __typename\n  }\n}\n",
            }),
            "method": "POST",
        });
        var error = (await re.json()).data.updateUserVideoProgress.error;
        if (error !== null) { console.log(error.code); }
        await sleep( 60_000 );
    }
}
async function intensiveFarmPoints(ms, account) {
    while (true) {
        completeVideo(globalFkey, account);
        await sleep(ms);
    }
}
async function setBasicInfo(account, newUsername, name, bio="") {
    re = await fetch("https://www.khanacademy.org/api/internal/graphql/updateProfile?curriculum=us-cc&lang=en&_=220810-1540-b55fcdc7dd33_1660174139150", {
        "headers": {
            "cookie": account,
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey
        },
        "body": `{\"operationName\":\"updateProfile\",\"variables\":{\"${bio}\":\"\",\"nickname\":\"${name}\",\"username\":\"${newUsername}\"},\"query\":\"mutation updateProfile($avatarName: String, $bio: String, $nickname: String, $username: String) {\\n  setSettings(avatarName: $avatarName, bio: $bio, nickname: $nickname, username: $username) {\\n    user {\\n      id\\n      avatar {\\n        name\\n        imageSrc\\n        __typename\\n      }\\n      bio\\n      nickname\\n      username\\n      __typename\\n    }\\n    errors {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    re.json(); //make sure it works...
    username = newUsername;
}
async function printPointsInfinite(ms, account) {
    checkPoints(account).then( points=>console.log(points) );
    setTimeout(()=>{printPointsInfinite(ms, account)},ms);
}
async function vote(account, key) {
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/VoteEntityMutation?curriculum=us-cc&lang=en", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "cookie": account.replace(/\r?\n|\r/g, ''),
            "x-ka-fkey": globalFkey,
        },
        "body": `{\"operationName\":\"VoteEntityMutation\",\"variables\":{\"postKey\":\"${key}\",\"voteType\":1},\"query\":\"mutation VoteEntityMutation($postKey: String!, $voteType: Int!) {\\n  voteEntity(entityKey: $postKey, voteType: $voteType) {\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    var json = await re.json();
    // if ( json.data.voteEntity.error  !== null )  {
    //     console.log("Error voting");
    //     console.log( re.status );
    // }
    return json;
}
async function voteProxy(account, key) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30_000);
        fetch("https://www.khanacademy.org/api/internal/graphql/VoteEntityMutation?curriculum=us-cc&lang=en", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "cookie": account,
                "x-ka-fkey": globalFkey,
                "proxy": getProxy()
            },
            "body": `{\"operationName\":\"VoteEntityMutation\",\"variables\":{\"postKey\":\"${key}\",\"voteType\":1},\"query\":\"mutation VoteEntityMutation($postKey: String!, $voteType: Int!) {\\n  voteEntity(entityKey: $postKey, voteType: $voteType) {\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
            "method": "POST",
            signal: controller.signal
        }).then(re=>{clearTimeout(timeoutId); re.json()});
        var json = await re.json()
    } catch (err) {
        console.log("Error voting");
        console.log( re.status );
    }
}
async function getAllProgramsByUser() {

}
async function flag(account, key, reason="", type="inappropriate") {
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/FlagPostMutation?curriculum=us-nocc&lang=en", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey,
            "cookie": account
        },
        "body": `{\"operationName\":\"FlagPostMutation\",\"variables\":{\"entityKey\":\"${key}\",\"flag\":\"${type}\",\"justification\":\"${reason}\"},\"query\":\"mutation FlagPostMutation($flag: String!, $entityKey: String!, $justification: String) {\\n  flagEntity(flag: $flag, entityKey: $entityKey, justification: $justification) {\\n    error {\\n      code\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`,
        "method": "POST",
    });
    var json = await re.json();
    return json.data.flagEntity;
}


//Bots
async function authAccountsFreq(ms=60000) {
    while (true) {
        console.log("Checking emails...");
        await authAllAccounts();
        console.log("Emails cleared");
        await sleep(ms);
    }
}
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
function pause() {
    var a = "";
}
async function checkAllBots(searchLoc, start, length) {
    var runningThreads = [];
    var workingAccounts = "";
    fs.readFile(searchLoc, 'utf8', async function(err, data) {
        if (err) { console.log(err); }
        //Get all accounts
        var accounts = data.split("\n");

        for (var i = start; i < accounts.length && i < length+start; i++) {
            console.log("   Checking " + accounts[i] + "...");
            var index = i;
            var failed = true;
            runningThreads.push("account");
            try {
                var account = await auth( accounts[index] )
                var user = await getFullUserProfile(account);
                if (user.signupDataIfUnverified === null) {
                    workingAccounts += accounts[index] + "\n";
                    console.log("Verified");
                } else {
                    console.log("Unverified");
                }
                runningThreads.shift();
            } catch(e) {
                console.log("Failed to use bot " + accounts[index] + ": " + e); 
                //Still write account because it was most likely a rate limit or something
                workingAccounts += accounts[i] + "\n";
                runningThreads.shift();
            }
            if (!failed) console.log("Bot " + (index+start) + " finished");
        } 
    });
    await sleep(2000);
    //console.log( runningThreads.length );
    while(runningThreads.length > 0) { await sleep(1000); }
    //console.log("Writing accounts...");
    //fs.writeFile(writeWorkingLoc, workingAccounts, function(err, data) { if (err) {console.log(err)} });
    return workingAccounts;
}
async function checkAllBotsThreads(searchLoc, writeWorkingLoc, threadNum, start=0, checkNum=Infinity) {
    var numAccounts = null;
    // Get number of accounts I need to go through
    fs.readFile(searchLoc, 'utf8', await function(err, data) {
        numAccounts = data.split("\n").length;
    });
    while (numAccounts === null) await sleep(100);
    if (checkNum < numAccounts) numAccounts = checkNum;
    console.log(numAccounts);

    // Calculate number each thread has to do
    var distance = Math.ceil( numAccounts / threadNum );
    
    var verified = "";
    var runningThreads = [];
    for (var i = 0; i < threadNum; i++) {
        runningThreads.push("t");
        checkAllBots(searchLoc, start + i*distance, distance).then(bot => {
            verified += bot;// + "\n";
            runningThreads.shift();
        });
        console.log("Starting at " + i*distance + ", going " + distance);
    }
    await sleep(500);
    while (runningThreads.length > 0) { await sleep(1000); }
    fs.writeFile(writeWorkingLoc, verified, function(err, data) { if (err) {console.log(err)} });
}
async function botFlagCode() {
    // var programsToFlag = [
    //     ["ag5zfmtoYW4tYWNhZGVteXIXCxIKU2NyYXRjaHBhZBiAgKOblaCqCww"],
    // ];
    // for (var i = 0; i < programsToFlag.length; i++) {
    //     await forEachBot("accounts-8-18", 5, async function(account) {
    //             console.log(i + ": " + JSON.stringify((await flag(account, programsToFlag[i][0], programsToFlag[i][1] || "If you ban users for Green/Blue/Red Lives Matter flags, this should user should be banned as well"))) );
    //             await sleep(8000);
    //     }, i+20, 2000);
    //     await sleep(3000);
    // }
    
    var target = "ag5zfmtoYW4tYWNhZGVteXIXCxIKU2NyYXRjaHBhZBiAgKOblaCqCww";
    var flagNum = 10;
    var i = 0;
    await forEachBot("accounts-8-19", flagNum, async function(account) {
        console.log(i++ + ": " + JSON.stringify((await flag(account, target, "This user has a sexual, religious pride-flag in their name and an asexual flag in their projects, neither of which have been taken care of. Please do so. - @KhanVigilante"))) );
    }, 0, (   5   )*1000);
}
async function checkAccount(account) {
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/getFlag?curriculum=us-cc&lang=en", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey
        },
    "body": "{\"operationName\":\"getFlag\",\"variables\":{\"name\":\"goliath_notifications\"},\"query\":\"query getFlag($name: String!) {\\n  flag(name: $name) {\\n    id\\n    name\\n    isUserPassing\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    });
    return (await re.text()).includes(`"isUserPassing":false`);
}

// Pranks
async function updateProgram(account, pID, code, thumb, title) {
    var re = await fetch(`https://www.khanacademy.org/api/internal/scratchpads/${pID}?client_dt=2022-09-02T14%3A24%3A05-05%3A00`, {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "x-ka-fkey": globalFkey,
            "cookie": account
        },
        "body": `{\"revision\":{\"code\":\"${code}\",\"editor_type\":\"pjs\",\"folds\":[],\"image_url\":\"${thumb}\",\"config_version\":4,\"topic_slug\":\"computer-programming\"},\"category\":null,\"difficulty\":null,\"tags\":[],\"title\":\"${title}\",\"translatedTitle\":\"${title}\",\"user_authored_content_type\":\"pjs\",\"width\":600,\"height\":400,\"origin_scratchpad_id\":5683490987753472,\"origin_revision_id\":5120541034332160,\"origin_scratchpad_kind\":\"Scratchpad\",\"is_spin_off\":false}`,
        "method": "PUT",
    });
    return re;
}
async function guideHL() {
    var rickAccount = await auth("RickrollMaster");  
    var re = await (await (await fetch("https://www.khanacademy.org/api/internal/scratchpads/top?casing=camel&sort=3&limit=30&topic_id=xffde7c31")).json());
        for (var i = 0; i < 30; i++) {
            try {
                var program = re.scratchpads[i];
                var goal = await (await fetch("https://rickroll-hotlist-prank-api.kestron.repl.co/?hotlistNum="+i)).json();
                if ( goal.title != program.title ) {
                    console.log("Goal: " + goal.title + " | Actual: " + program.title);
                    if ( goal.authorKaid == "kaid_739833737705082235223777") {
                        // Edit program
                        var pID = program.url+"";
                        pID = pID.substring(pID.lastIndexOf("/")+1, pID.length);
                        // var re = await fetch(`https://www.khanacademy.org/api/internal/scratchpads/${pID}?client_dt=2022-09-01T21%3A14%3A21-05%3A00`, {
                        //     "headers": {
                        //         "accept": "*/*",
                        //         "accept-language": "en-US,en;q=0.9",
                        //         "content-type": "application/json",
                        //         "x-ka-fkey": globalFkey,
                        //         "cookie": rickAccount
                        //     },
                        //     "body": `{\"revision\":{\"code\":\"${goal.code}\",\"editor_type\":\"webpage\",\"folds\":[],\"image_url\":\"${goal.thumb}\",\"config_version\":4,\"topic_slug\":\"computer-programming\"},\"category\":null,\"difficulty\":null,\"tags\":[],\"title\":\"${goal.title}\",\"translatedTitle\":\"${goal.title}\",\"user_authored_content_type\":\"webpage\",\"width\":600,\"height\":600,\"origin_scratchpad_id\":${pID},\"origin_revision_id\":${pID},\"origin_scratchpad_kind\":\"Scratchpad\",\"is_spin_off\":false}`,
                        //     "method": "PUT",
                        // });
                        // var re = await fetch(`https://www.khanacademy.org/api/internal/scratchpads/${pID}?client_dt=2022-09-02T14%3A24%3A05-05%3A00`, {
                        //     "headers": {
                        //         "accept": "*/*",
                        //         "accept-language": "en-US,en;q=0.9",
                        //         "content-type": "application/json",
                        //         "x-ka-fkey": globalFkey,
                        //         "cookie": rickAccount
                        //     },
                        //     "body": `{\"revision\":{\"code\":\"${goal.code}\",\"editor_type\":\"pjs\",\"folds\":[],\"image_url\":\"${goal.thumb}\",\"config_version\":4,\"topic_slug\":\"computer-programming\"},\"category\":null,\"difficulty\":null,\"tags\":[],\"title\":\"${goal.title}\",\"translatedTitle\":\"${goal.title}\",\"user_authored_content_type\":\"pjs\",\"width\":600,\"height\":400,\"origin_scratchpad_id\":5683490987753472,\"origin_revision_id\":5120541034332160,\"origin_scratchpad_kind\":\"Scratchpad\",\"is_spin_off\":false}`,
                        //     "method": "PUT",
                        // });
                        var re = await updateProgram(rickAccount, pID, goal.code, goal.thumb, goal.title);
                        re.json().then(a=>console.log("Update Program"))
                    } else {
                        console.log("Program by " + program.authorNickname + " is inside gif range");
                    }
                }
            } catch (e) { console.log(e); }
        }
    setTimeout(async function() {
        guideHL();
    }, 600_000); //10 min
}
async function createProgramList(accountName) {
    for (i = 0; i < 30; i++) {
        const index = i;
        fetch("https://rickroll-hotlist-prank-api.kestron.repl.co/?hotlistNum="+i).then(async function(re){
            var goal = await re.json();
            programGoal[index] = goal;
            console.log("Loaded goal " + index);
        });
        await sleep(200);
    }
    while (programGoal.length < 30) { await sleep(2000); }
    console.log("Loaded goals");

    var programs = [];
    var rickAccount = await auth(accountName || "akjhdfakjhfkh");
    // Create programs
    for (i = 29; i >= 0; i--) { //Going backwards so lowest part is oldest
        var re = await fetch("https://www.khanacademy.org/api/internal/scratchpads?client_dt=2022-09-02T18%3A07%3A31-05%3A00&lang=en", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "x-ka-fkey": globalFkey,
                "cookie": rickAccount
            },
            "body": `{\"revision\":{\"code\":\"${programGoal[i].code}\",\"editor_type\":\"pjs\",\"folds\":[],\"image_url\":\"${programGoal[i].thumb}\",\"config_version\":4,\"topic_slug\":\"computer-programming\"},\"category\":null,\"difficulty\":null,\"tags\":[],\"title\":\"${programGoal[i].title}\",\"translatedTitle\":\"${programGoal[i].title}\",\"user_authored_content_type\":\"pjs\",\"is_spin_off\":false}`,
            "method": "POST",
        });
        var json = await re.json();
        programs.push( [ json.id, json.key ] );
        console.log(`"${json.key}",`); //If the code is interrupted part way through, I can just grab the keys from the console
        await sleep(100);
    }
    // Update each program to be part of the rickroll
    // for (i = 0; i < 30; i++) {
    //     var goal = await (await fetch("https://rickroll-hotlist-prank-api.kestron.repl.co/?hotlistNum="+i)).json();
    //     var re = await updateProgram(rickAccount, programs[i][0], goal.code, goal.thumb, goal.title);
    //     console.log(re.status);
    // }
    //Print in a way I can copy it over to the voter
    // programs.forEach(p => {
    //     console.log(p[1] + ",");
    // });
    return programs;
}
async function defineProxies() {
    var agentsRe = await (await fetch('https://www.proxy-list.download/api/v1/get?type=https&anon=elite')).text();
    var agents = (agentsRe.toString().split("\r\n")); agents.pop();
    for (let i = 0; i < agents.length; i++) {
        var agent = agents[i].split(":");
        proxies.push(new HttpsProxyAgent({host: agent[0], port: agent[1]}));
    }
    console.log(proxies);
}
async function getProxy() {
    return proxies[proxyIndex>=proxies.length?proxyIndex=0:proxyIndex++];
}


//Run code (with await ability)//
(async function main () {////////
console.log("Started");//////////
////////////\/Code\//////////////
saveLocG = "accounts-k-10-1";

// Yeah ik you don't agree with this but I did hide a few LGBT programs, just ignore this part
// await botFlagCode();


// This was a joke where we were going to cover the whole HL in one giant rickroll, but we postponed that 
// because we were caught, so we need more computers at once, and we wanted to do it when KA was less active
// so it would disturb the least amount  of people but still show the problem of bots =P
// var programs = await createProgramList("RickrollMaster");
// console.log(programs);
// await guideHL();
// return;


// This will generate accounts
// while (true) {
//     try {
//     await generateAccounts(1, "accounts-k-10-1", true);
//     } catch (err) {
//         console.log(err);
//         await sleep(20_000)
//     } 
// }

// This will farm points
// farmPointsUntil(await auth("ACCOUNT_NAME"), 2_000_000);


})();
//‎
