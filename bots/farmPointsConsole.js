async function completeVideo(fkey) {
    await fetch("https://www.khanacademy.org/api/internal/graphql/clearRecommendationForContentItemWeb?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796382798", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"clearRecommendationForContentItemWeb\",\"variables\":{\"unitId\":\"x9c23cad6d9661edd\",\"contentDescriptor\":\"Video:565175118\"},\"query\":\"mutation clearRecommendationForContentItemWeb($contentDescriptor: String!, $unitId: String!) {\\n  clearRecommendation(contentDescriptor: $contentDescriptor, unitId: $unitId) {\\n    wasSuccessful\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796382799", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22content_modal_view%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.747Z%22%2C%22extraJson%22%3A%22%7B%5C%22content_id%5C%22%3A%5C%22565175118%5C%22%2C%5C%22is_recommended%5C%22%3Afalse%2C%5C%22kind%5C%22%3A%5C%22Video%5C%22%2C%5C%22slug%5C%22%3A%5C%22origins-of-algebra%5C%22%2C%5C%22referrer%5C%22%3A%5C%22topic_progress%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/graphql/getUserInfoForTopicProgressMastery?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796382800", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"getUserInfoForTopicProgressMastery\",\"variables\":{\"topicId\":\"x9c23cad6d9661edd\"},\"query\":\"query getUserInfoForTopicProgressMastery($topicId: String!) {\\n  user {\\n    contentItemProgresses(queryBy: {parentTopicId: $topicId}) {\\n      ...CommonContentItemProgressesFragment\\n      __typename\\n    }\\n    ...CommonUserInfoFragment\\n    __typename\\n  }\\n}\\n\\nfragment CommonContentItemProgressesFragment on ContentItemProgress {\\n  bestScore {\\n    numAttempted\\n    numCorrect\\n    completedDate\\n    __typename\\n  }\\n  completionStatus\\n  content {\\n    id\\n    progressKey\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment CommonUserInfoFragment on User {\\n  id\\n  curationItemProgress(topicId: $topicId) {\\n    masteryEnabled\\n    subjectMasteryEnabled\\n    masteryMap {\\n      progressKey\\n      status\\n      __typename\\n    }\\n    currentMastery {\\n      percentage\\n      pointsEarned\\n      pointsAvailable\\n      __typename\\n    }\\n    __typename\\n  }\\n  recommendationsForUnit(unitId: $topicId) {\\n    contentId\\n    sourceId\\n    kind\\n    __typename\\n  }\\n  __typename\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=NAVIGATING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.kind=TOPIC&lang=en&_=220805-1153-93c45616da29_1659796382801", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22topic_progress_page_visit%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.748Z%22%2C%22extraJson%22%3A%22%7B%5C%22subject%5C%22%3A%5C%22Algebra+1%5C%22%2C%5C%22topicSlug%5C%22%3A%5C%22x2f8bb11595b61c86%3Afoundation-algebra%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22NAVIGATING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22TOPIC%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/graphql/getFpmMasteryForTopic?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796382801", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"getFpmMasteryForTopic\",\"variables\":{\"topicId\":\"x9c23cad6d9661edd\"},\"query\":\"query getFpmMasteryForTopic($topicId: String!) {\\n  user {\\n    id\\n    curationItemProgress(topicId: $topicId) {\\n      masteryMap {\\n        progressKey\\n        status\\n        __typename\\n      }\\n      currentMastery {\\n        percentage\\n        pointsEarned\\n        pointsAvailable\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/graphql/quizAndUnitTestAttemptsQuery?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796382802", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"quizAndUnitTestAttemptsQuery\",\"variables\":{\"topicId\":\"x9c23cad6d9661edd\"},\"query\":\"query quizAndUnitTestAttemptsQuery($topicId: String!) {\\n  user {\\n    id\\n    latestUnitTestAttempts(unitId: $topicId) {\\n      id\\n      numAttempted\\n      numCorrect\\n      completedDate\\n      canResume\\n      isCompleted\\n      __typename\\n    }\\n    latestQuizAttempts(topicId: $topicId) {\\n      id\\n      numAttempted\\n      numCorrect\\n      completedDate\\n      canResume\\n      isCompleted\\n      positionKey\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=NAVIGATING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.kind=TOPIC&lang=en&_=220805-1153-93c45616da29_1659796382802", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22pageview_concept%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.750Z%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22NAVIGATING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22TOPIC%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796382817", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22content_modal_view%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.776Z%22%2C%22extraJson%22%3A%22%7B%5C%22content_id%5C%22%3A%5C%22565175118%5C%22%2C%5C%22is_recommended%5C%22%3Afalse%2C%5C%22kind%5C%22%3A%5C%22Video%5C%22%2C%5C%22slug%5C%22%3A%5C%22origins-of-algebra%5C%22%2C%5C%22referrer%5C%22%3A%5C%22topic_progress%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796382825", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22pageview%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.815Z%22%2C%22extraJson%22%3A%22%7B%5C%22path%5C%22%3A%5C%22%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%5C%22%2C%5C%22qs%5C%22%3A%5C%22modal%3D1%5C%22%2C%5C%22utc%5C%22%3A-300%7D%22%2C%22learningTimeInfo%22%3A%7B%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796382827", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22pagerequest%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.815Z%22%2C%22extraJson%22%3A%22%7B%5C%22path%5C%22%3A%5C%22%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%5C%22%2C%5C%22qs%5C%22%3A%5C%22modal%3D1%5C%22%2C%5C%22utc%5C%22%3A-300%7D%22%2C%22learningTimeInfo%22%3A%7B%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/graphql/getLastSecond?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796382837", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"getLastSecond\",\"variables\":{\"readableVideoId\":\"origins-of-algebra\"},\"query\":\"query getLastSecond($readableVideoId: String!) {\\n  user {\\n    id\\n    contentItemProgresses(queryBy: {videoSlug: $readableVideoId}) {\\n      ... on VideoItemProgress {\\n        lastSecondWatched\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796382838", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_player_mounted%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A02.832Z%22%2C%22extraJson%22%3A%22%7B%5C%22youtubeId%5C%22%3A%5C%22_LDR1_Prveo%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/page_perf_log?lang=en&_=220805-1153-93c45616da29_1659796383655", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"originalRequestId\":\"12345\",\"pageName\":\"video_modal\",\"navigation\":\"client\",\"sufficientlyUsable\":898,\"fullyInteractive\":898,\"firstByte\":null}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796383656", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_log_client%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A03.654Z%22%2C%22extraJson%22%3A%22%7B%5C%22contentId%5C%22%3A%5C%22565175118%5C%22%2C%5C%22secondsWatched%5C%22%3A0%2C%5C%22lastSecondWatched%5C%22%3A0%2C%5C%22durationSeconds%5C%22%3A0%2C%5C%22lessonId%5C%22%3A%5C%22x50fd24681d6e296e%5C%22%2C%5C%22captionsLocale%5C%22%3A%5C%22%5C%22%2C%5C%22fallbackPlayer%5C%22%3Afalse%2C%5C%22localTimezoneOffsetSeconds%5C%22%3A-18000%2C%5C%22gaReferrer%5C%22%3A%5C%22%5C%22%2C%5C%22youtubeId%5C%22%3A%5C%22_LDR1_Prveo%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_mt/graphql/updateUserVideoProgress?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796383657", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"updateUserVideoProgress\",\"variables\":{\"input\":{\"contentId\":\"565175118\",\"secondsWatched\":0,\"lastSecondWatched\":0,\"durationSeconds\":0,\"lessonId\":\"x50fd24681d6e296e\",\"captionsLocale\":\"\",\"fallbackPlayer\":false,\"localTimezoneOffsetSeconds\":-18000,\"gaReferrer\":\"\"}},\"query\":\"mutation updateUserVideoProgress($input: UserVideoProgressInput!) {\\n  updateUserVideoProgress(videoProgressUpdate: $input) {\\n    videoItemProgress {\\n      content {\\n        id\\n        progressKey\\n        ... on Video {\\n          downloadUrls\\n          __typename\\n        }\\n        __typename\\n      }\\n      lastSecondWatched\\n      secondsWatched\\n      lastWatched\\n      points\\n      started\\n      completed\\n      __typename\\n    }\\n    actionResults {\\n      pointsEarned {\\n        points\\n        __typename\\n      }\\n      tutorialNodeProgress {\\n        contentId\\n        progress\\n        __typename\\n      }\\n      userProfile {\\n        countVideosCompleted\\n        points\\n        countBrandNewNotifications\\n        __typename\\n      }\\n      notificationsAdded {\\n        badges\\n        avatarParts\\n        readable\\n        urgent\\n        toast\\n        continueUrl\\n        __typename\\n      }\\n      ... on VideoActionResults {\\n        currentTask {\\n          id\\n          content {\\n            id\\n            __typename\\n          }\\n          pointBounty\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      debugMessage\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796384282", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_started_in_pageview%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A04.280Z%22%2C%22extraJson%22%3A%22%7B%5C%22content_id%5C%22%3A%5C%22565175118%5C%22%2C%5C%22fallbackPlayer%5C%22%3Afalse%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796405768", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_log_client%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A25.765Z%22%2C%22extraJson%22%3A%22%7B%5C%22contentId%5C%22%3A%5C%22565175118%5C%22%2C%5C%22secondsWatched%5C%22%3A21.471000000000004%2C%5C%22lastSecondWatched%5C%22%3A21.471000000000004%2C%5C%22durationSeconds%5C%22%3A437%2C%5C%22lessonId%5C%22%3A%5C%22x50fd24681d6e296e%5C%22%2C%5C%22captionsLocale%5C%22%3A%5C%22en%5C%22%2C%5C%22fallbackPlayer%5C%22%3Afalse%2C%5C%22localTimezoneOffsetSeconds%5C%22%3A-18000%2C%5C%22gaReferrer%5C%22%3A%5C%22%5C%22%2C%5C%22youtubeId%5C%22%3A%5C%22_LDR1_Prveo%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_mt/graphql/updateUserVideoProgress?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796405769", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"updateUserVideoProgress\",\"variables\":{\"input\":{\"contentId\":\"565175118\",\"secondsWatched\":21.471000000000004,\"lastSecondWatched\":21.471000000000004,\"durationSeconds\":437,\"lessonId\":\"x50fd24681d6e296e\",\"captionsLocale\":\"en\",\"fallbackPlayer\":false,\"localTimezoneOffsetSeconds\":-18000,\"gaReferrer\":\"\"}},\"query\":\"mutation updateUserVideoProgress($input: UserVideoProgressInput!) {\\n  updateUserVideoProgress(videoProgressUpdate: $input) {\\n    videoItemProgress {\\n      content {\\n        id\\n        progressKey\\n        ... on Video {\\n          downloadUrls\\n          __typename\\n        }\\n        __typename\\n      }\\n      lastSecondWatched\\n      secondsWatched\\n      lastWatched\\n      points\\n      started\\n      completed\\n      __typename\\n    }\\n    actionResults {\\n      pointsEarned {\\n        points\\n        __typename\\n      }\\n      tutorialNodeProgress {\\n        contentId\\n        progress\\n        __typename\\n      }\\n      userProfile {\\n        countVideosCompleted\\n        points\\n        countBrandNewNotifications\\n        __typename\\n      }\\n      notificationsAdded {\\n        badges\\n        avatarParts\\n        readable\\n        urgent\\n        toast\\n        continueUrl\\n        __typename\\n      }\\n      ... on VideoActionResults {\\n        currentTask {\\n          id\\n          content {\\n            id\\n            __typename\\n          }\\n          pointBounty\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      debugMessage\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796413105", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22termination_event%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A33.104Z%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796414993", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_log_client%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A34.991Z%22%2C%22extraJson%22%3A%22%7B%5C%22contentId%5C%22%3A%5C%22565175118%5C%22%2C%5C%22secondsWatched%5C%22%3A9.186%2C%5C%22lastSecondWatched%5C%22%3A30.822488095367433%2C%5C%22durationSeconds%5C%22%3A437%2C%5C%22lessonId%5C%22%3A%5C%22x50fd24681d6e296e%5C%22%2C%5C%22captionsLocale%5C%22%3A%5C%22en%5C%22%2C%5C%22fallbackPlayer%5C%22%3Afalse%2C%5C%22localTimezoneOffsetSeconds%5C%22%3A-18000%2C%5C%22gaReferrer%5C%22%3A%5C%22%5C%22%2C%5C%22youtubeId%5C%22%3A%5C%22_LDR1_Prveo%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_mt/graphql/updateUserVideoProgress?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796414996", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"updateUserVideoProgress\",\"variables\":{\"input\":{\"contentId\":\"565175118\",\"secondsWatched\":9.186,\"lastSecondWatched\":30.822488095367433,\"durationSeconds\":437,\"lessonId\":\"x50fd24681d6e296e\",\"captionsLocale\":\"en\",\"fallbackPlayer\":false,\"localTimezoneOffsetSeconds\":-18000,\"gaReferrer\":\"\"}},\"query\":\"mutation updateUserVideoProgress($input: UserVideoProgressInput!) {\\n  updateUserVideoProgress(videoProgressUpdate: $input) {\\n    videoItemProgress {\\n      content {\\n        id\\n        progressKey\\n        ... on Video {\\n          downloadUrls\\n          __typename\\n        }\\n        __typename\\n      }\\n      lastSecondWatched\\n      secondsWatched\\n      lastWatched\\n      points\\n      started\\n      completed\\n      __typename\\n    }\\n    actionResults {\\n      pointsEarned {\\n        points\\n        __typename\\n      }\\n      tutorialNodeProgress {\\n        contentId\\n        progress\\n        __typename\\n      }\\n      userProfile {\\n        countVideosCompleted\\n        points\\n        countBrandNewNotifications\\n        __typename\\n      }\\n      notificationsAdded {\\n        badges\\n        avatarParts\\n        readable\\n        urgent\\n        toast\\n        continueUrl\\n        __typename\\n      }\\n      ... on VideoActionResults {\\n        currentTask {\\n          id\\n          content {\\n            id\\n            __typename\\n          }\\n          pointBounty\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      debugMessage\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796431793", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_end_card_seen%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A51.758Z%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_bb/bigbingo/mark_conversions?product=OTHER_PRODUCT&activity=WATCHING&content.domainId=x7a488390&content.courseId=x2f8bb11595b61c86&content.unitId=x9c23cad6d9661edd&content.contentId=565175118&content.lessonId=x50fd24681d6e296e&content.kind=VIDEO&lang=en&_=220805-1153-93c45616da29_1659796431798", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
        "x-ka-fkey": fkey,
    },
    "body": "conversion=%7B%22conversion%22%3A%22video_log_client%22%2C%22untrustedClientTimestamp%22%3A%222022-08-06T14%3A33%3A51.797Z%22%2C%22extraJson%22%3A%22%7B%5C%22contentId%5C%22%3A%5C%22565175118%5C%22%2C%5C%22secondsWatched%5C%22%3A16.752000000000002%2C%5C%22lastSecondWatched%5C%22%3A336.1483679599457%2C%5C%22durationSeconds%5C%22%3A437%2C%5C%22lessonId%5C%22%3A%5C%22x50fd24681d6e296e%5C%22%2C%5C%22captionsLocale%5C%22%3A%5C%22en%5C%22%2C%5C%22fallbackPlayer%5C%22%3Afalse%2C%5C%22localTimezoneOffsetSeconds%5C%22%3A-18000%2C%5C%22gaReferrer%5C%22%3A%5C%22%5C%22%2C%5C%22youtubeId%5C%22%3A%5C%22_LDR1_Prveo%5C%22%7D%22%2C%22learningTimeInfo%22%3A%7B%22product%22%3A%22OTHER_PRODUCT%22%2C%22activity%22%3A%22WATCHING%22%2C%22localTimeOffsetSeconds%22%3A%7B%22offsetSeconds%22%3A-18000%7D%2C%22urlForDebugging%22%3A%22https%3A%2F%2Fwww.khanacademy.org%2Fmath%2Falgebra%2Fx2f8bb11595b61c86%3Afoundation-algebra%2Fx2f8bb11595b61c86%3Aalgebra-overview-history%2Fv%2Forigins-of-algebra%3Fmodal%3D1%22%2C%22kaLocale%22%3A%22en%22%2C%22content%22%3A%7B%22domainId%22%3A%22x7a488390%22%2C%22courseId%22%3A%22x2f8bb11595b61c86%22%2C%22unitId%22%3A%22x9c23cad6d9661edd%22%2C%22contentTitle%22%3A%22Origins+of+algebra%22%2C%22contentId%22%3A%22565175118%22%2C%22lessonId%22%3A%22x50fd24681d6e296e%22%2C%22contentCommitSha%22%3A%225bff5c0058f62dd6c1d0d17439b344dc46b907ef%22%2C%22kind%22%3A%22VIDEO%22%7D%7D%7D",
    "method": "POST",
    }); ;
    await fetch("https://www.khanacademy.org/api/internal/_mt/graphql/updateUserVideoProgress?curriculum=us-cc&lang=en&_=220805-1153-93c45616da29_1659796431799", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey,
    },
    "body": "{\"operationName\":\"updateUserVideoProgress\",\"variables\":{\"input\":{\"contentId\":\"565175118\",\"secondsWatched\":16.752000000000002,\"lastSecondWatched\":336.1483679599457,\"durationSeconds\":437,\"lessonId\":\"x50fd24681d6e296e\",\"captionsLocale\":\"en\",\"fallbackPlayer\":false,\"localTimezoneOffsetSeconds\":-18000,\"gaReferrer\":\"\"}},\"query\":\"mutation updateUserVideoProgress($input: UserVideoProgressInput!) {\\n  updateUserVideoProgress(videoProgressUpdate: $input) {\\n    videoItemProgress {\\n      content {\\n        id\\n        progressKey\\n        ... on Video {\\n          downloadUrls\\n          __typename\\n        }\\n        __typename\\n      }\\n      lastSecondWatched\\n      secondsWatched\\n      lastWatched\\n      points\\n      started\\n      completed\\n      __typename\\n    }\\n    actionResults {\\n      pointsEarned {\\n        points\\n        __typename\\n      }\\n      tutorialNodeProgress {\\n        contentId\\n        progress\\n        __typename\\n      }\\n      userProfile {\\n        countVideosCompleted\\n        points\\n        countBrandNewNotifications\\n        __typename\\n      }\\n      notificationsAdded {\\n        badges\\n        avatarParts\\n        readable\\n        urgent\\n        toast\\n        continueUrl\\n        __typename\\n      }\\n      ... on VideoActionResults {\\n        currentTask {\\n          id\\n          content {\\n            id\\n            __typename\\n          }\\n          pointBounty\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    error {\\n      code\\n      debugMessage\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}",
    "method": "POST",
    }); ;
}
async function getPoints(fkey) {
    var re = await fetch("https://www.khanacademy.org/api/internal/graphql/getFullUserProfile", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "x-ka-fkey": fkey
      },
      "body": "{\"operationName\":\"getFullUserProfile\",\"query\":\"query getFullUserProfile($kaid: String, $username: String) {\\n  user(kaid: $kaid, username: $username) {\\n    id\\n    kaid\\n    key\\n    userId\\n    email\\n    username\\n    profileRoot\\n    gaUserId\\n    qualarooId\\n    isPhantom\\n    isDeveloper: hasPermission(name: \\\"can_do_what_only_admins_can_do\\\")\\n    isCurator: hasPermission(name: \\\"can_curate_tags\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isCreator: hasPermission(name: \\\"has_creator_role\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isPublisher: hasPermission(name: \\\"can_publish\\\", scope: ANY_ON_CURRENT_LOCALE)\\n    isModerator: hasPermission(name: \\\"can_moderate_users\\\", scope: GLOBAL)\\n    isParent\\n    isSatStudent\\n    isTeacher\\n    isDataCollectible\\n    isChild\\n    isOrphan\\n    isCoachingLoggedInUser\\n    canModifyCoaches\\n    nickname\\n    hideVisual\\n    joined\\n    points\\n    countVideosCompleted\\n    bio\\n    profile {\\n      accessLevel\\n      __typename\\n    }\\n    soundOn\\n    muteVideos\\n    showCaptions\\n    prefersReducedMotion\\n    noColorInVideos\\n    autocontinueOn\\n    newNotificationCount\\n    canHellban: hasPermission(name: \\\"can_ban_users\\\", scope: GLOBAL)\\n    canMessageUsers: hasPermission(name: \\\"can_send_moderator_messages\\\", scope: GLOBAL)\\n    isSelf: isActor\\n    hasStudents: hasCoachees\\n    hasClasses\\n    hasChildren\\n    hasCoach\\n    badgeCounts\\n    homepageUrl\\n    isMidsignupPhantom\\n    includesDistrictOwnedData\\n    canAccessDistrictsHomepage\\n    preferredKaLocale {\\n      id\\n      kaLocale\\n      status\\n      __typename\\n    }\\n    underAgeGate {\\n      parentEmail\\n      daysUntilCutoff\\n      approvalGivenAt\\n      __typename\\n    }\\n    authEmails\\n    signupDataIfUnverified {\\n      email\\n      emailBounced\\n      __typename\\n    }\\n    pendingEmailVerifications {\\n      email\\n      __typename\\n    }\\n    tosAccepted\\n    shouldShowAgeCheck\\n    __typename\\n  }\\n  actorIsImpersonatingUser\\n}\\n\",\"variables\":{}}",
      "method": "POST",
      "credentials": "include"
    });
    return await re.json();
}
async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
var fkey = ('; '+document.cookie).split(`; fkey=`).pop().split(';')[0];
setInterval(()=>{
    getPoints(fkey).then(p => {
        console.log(`Current points: ${p.data.user.points}`);
    });
}, 1000);
while (true) {
    for (var i = 3; i--;) {
        completeVideo(fkey);
    }
    await sleep(6000);
}
