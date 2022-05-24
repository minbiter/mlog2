# API

> API Docs는 다음과 같이 정의한다.

- 분류(ex. USER, DIARY,...)
- title&contents
- HTTP Method
- function(기능)
- Request URL
- certification(ex. true or false)
- parameter or querystring

## HTTP 응답 코드

> HTTP RESPONSE CODE

| 200 | OK: 정상                       |
| --- | ------------------------------ |
| 400 | Bad Request : 파라미터 오류    |
| 404 | Not Found : 존재하지 않는 요청 |
| 50x | Server error : 서버 오류       |

## User

사용자 관련 API

### /user

> ENDPOINT

| Method   | function | Request Url | Authentication |
| -------- | -------- | ----------- | -------------- |
| `POST`   | SignIn   | `/user`     | false          |
| `DELETE` | SignOut  | `/user`     | true           |

> PARAMETERS (`POST`)

| email    | 사용자 이메일   | string, Max Length: 50, Required(`POST`)                |
| -------- | --------------- | ------------------------------------------------------- |
| password | 사용자 비밀번호 | string, Min Length: 8, Max Length: 28, Required(`POST`) |

> Example Request(`POST`)

```json
{
  "email": "guest@mlog.com",
  "password": "12341234"
}
```

> Example Response(`POST`)

```json
{
  "result": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjUyMTY5ODE4LCJpYXQiOjE2NTIwODM0MTh9.xLYuP76MO8cOSyj4-nQLKFC29n8kiCezFlou_lNNuPc",
    "email": "guest@mlog.com",
    "id": 1,
    "isSurvey": 1, // true or false
  }
}
```

> Example Response(`DELETE`)

```json
{
  "result": true
}
```



### /user/signup

> ENDPOINT

| Method | function | Request Url    | Authentication |
| ------ | -------- | -------------- | -------------- |
| `POST` | SignUp   | `/user/signup` | false          |

> PARAMETERS (`POST`)

| email           | 사용자 이메일        | string, Max Length: 50, Required(`POST`)                |
| --------------- | -------------------- | ------------------------------------------------------- |
| password        | 사용자 비밀번호      | string, Min Length: 8, Max Length: 28, Required(`POST`) |
| passwordConfirm | 사용자 비밀번호 확인 | string, Min Length: 8, Max Length: 28, Required(`POST`) |

> Example Request(`POST`)

```json
{
  "email": "guest@mlog.com",
  "password": "12341234",
  "passwordConfrim": "12341234"
}
```

> Example Response(`POST`)

```json
{
  "result": true,
  "data": {}
}
```



### /user/{userId}

> ENDPOINT

| Method   | function      | Request Url      | Authentication |
| -------- | ------------- | ---------------- | -------------- |
| `PATCH`  | editAccount   | `/user/{userId}` | true           |
| `DELETE` | deleteAccount | `/user/{userId}` | true           |

> PARAMETERS (`PATCH`, `DELETE`)

| password           | 사용자 비밀번호             | string, Min Length: 8, Max Length: 28, Required(`PATCH`, `DELETE`) |
| ------------------ | --------------------------- | ------------------------------------------------------------------ |
| newPassword        | 사용자 새로운 비밀번호      | string, Min Length: 8, Max Length: 28, Required(`PATCH`)           |
| newPasswordConfirm | 사용자 새로운 비밀번호 확인 | string, Min Length: 8, Max Length: 28, Required(`PATCH`)           |

> Example Request(`PATCH`)

```json

```

> Example Response(`PATCH`)

```json

```

> Example Request(`DELETE`)

```json

```

> Example Response(`DELETE`)

```json

```



### /refresh

> ENDPOINT

| Method | function         | Request Url | Authentication     |
| ------ | ---------------- | ----------- | ------------------ |
| `GET`  | fetchAccessToken | `/refresh`  | true(refreshToken) |

> Example Response(`GET`)

```json
{
  "result": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwiZXhwIjoxNjUyMTc4MDU5LCJpYXQiOjE2NTIwOTE2NTl9.hWhI6daeqqkCRQqNYrT8-dC4zJILRtrA88zeGxhE5eM",
    "email": "test@naver.com",
    "isSurvey": 0
  }
}
```



## Survey

사용자의 감정마다 선호하는 음악장르를 알기 위한 설문조사 API

### /survey

> ENDPOINT

| Method | function     | Request Url | Authentication |
| ------ | ------------ | ----------- | -------------- |
| `GET`  | fetchSurvey  | `/survey`   | false          |
| `POST` | createSurvey | `/survey`   | true           |
| `PUT`  | updateSurvey | `/survey`   | true           |

> PARAMETERS(`POST`, `PUT`)

| neutral  | 중립 | array, Min Length: 1, Max Length: 3, Required |
| -------- | ---- | --------------------------------------------- |
| positive | 긍정 | array, Min Length: 1, Max Length: 3, Required |
| negative | 부정 | array, Min Length: 1, Max Length: 3, Required |

> Example Response(`GET`)

```json
{
  "result": true,
  "data": {
    // 총 12개에 장르별 대표음악.
    "surveyMusic": [
      {
        "title": "취중고백",
        "artist": "김민석 (멜로망스)",
        "img": "https://cdn.music-flo.com/image/v2/album/662/145/07/04/407145662_61bc226d_s.jpg?1639719534775/dims/resize/75x75/quality/90",
        "videoId": "FCrMKhrFH7A",
        "genreId": 3550,
        "name": "국내 발라드"
      }, ...
    ]
  }
}
```

> Example Request(`POST`, `PUT`)

```json
{
  "neutral": [3550, 3556, 3559],
  "positive": [3551, 3562, 3553],
  "negative": [3561, 3552, 3560]
}
```

> Example Response(`POST`)

```json
{
  "result": true,
  "data": {
    "survey": "설문 작성에 성공했습니다."
  }
}
```

> Example Response(`PUT`)

```json
{
  "result": true,
  "data": {
    "survey": "설문조사가 초기화되었습니다."
  }
}
```



## Diary

Diary 관련 API

### /diary?startDate=yyyymmdd&endDate=yyyymmdd

범위 내의 작성된 diary의 날짜, 가장 높은 감정, 선택된 음악정보를 불러온다.

**(참고) default 값은 현재 Month 기준으로 불러온다.**

> ENDPOINT

| Method | function     | Request Url | Authentication |
| ------ | ------------ | ----------- | -------------- |
| `GET`  | fetchDiaries | `/diary`    | true           |

> QUERY-STRING

| startDate | start 날짜 | string, Length: 8, Optional |
| --------- | ---------- | --------------------------- |
| endDate   | end 날짜   | string, Length: 8, Optional |

> Example Response(`GET`)

```json
{
  "result": true,
  "data": {
    "diary": {
      "20220502": {
        "title": "우울한 오늘.",
        "topEmotion": "negative"
      },
      "20220505": {
        "title": "나만의 휴식.",
        "topEmotion": "positive"
      },
      "20220506": {
        "title": "평범한 일상.",
        "topEmotion": "neutral"
      }
    }
  }
}
```



### /diary/{yyyymmdd}

일기 CRUD API

> ENDPOINT

| Method   | function | Request Url         | Authentication |
| -------- | -------- | ------------------- | -------------- |
| `GET`    | Read     | `/diary/{yyyymmdd}` | true           |
| `POST`   | Create   | `/diary/{yyyymmdd}` | true           |
| `PUT`    | Update   | `/diary/{yyyymmdd}` | true           |
| `DELETE` | Delete   | `/diary/{yyyymmdd}` | true           |

> PARAMETERS(`POST`, `PUT`)

| title   | 일기 제목 | string, Max Length: 50, Required(`POST`), Optional(`PUT`) |
| ------- | --------- | --------------------------------------------------------- |
| content | 일기 내용 | string, Required(`POST`), Optional(`PUT`)                 |

> Example Response(`GET`)

```json
{
  "result": true,
  "data": {
    "diary": {
      "id": 2,
      "uid": 1,
      "diaryDate": 20220502,
      "title": "우울한 오늘.",
      "content": "오늘은 우울한 하루이다. ....",
      "isMusic": 1, // true or false
      "music": {
				"title": "취중고백",
        "artist": "김민석 (멜로망스)",
        "img": "https://cdn.music-flo.com/image/v2/album/662/145/07/04/407145662_61bc226d_s.jpg?1639719534775/dims/resize/75x75/quality/90",
        "videoId": "FCrMKhrFH7A",
        "genreId": 3550,
        "name": "국내 발라드"
      },
    }
  }
}
```

> Example Request(`POST`, `PUT`)

```json
{
  "title": "일기 제목입니다.",
  "content": "일기 내용입니다."
}
```

> Example Response(`POST`, `PUT`)

```json
{	
  "result": true,
  "data": {
    "diary": {
      "diaryId": 2,
      "emotion": {
        "positive":0,
        "negative":1,
        "neutral":0,
        "topEmotion":"negative"
      }
    }
  }
}
```

> Example Response(`DELETE`)

```json
{
  "result": true,
  "data": {
    "diary":"일기가 삭제되었습니다."
  }
}
```



### /diary-music/{yyyymmdd}

해당 날짜의 추천된 음악 불러오기 or 선택된 음악 등록

> ENDPOINT

| Method | function       | Request Url               | Authentication |
| ------ | -------------- | ------------------------- | -------------- |
| `GET`  | fetchRcdMusic  | `/diary-music/{yyyymmdd}` | true           |
| `POST` | postDiaryMusic | `/diary-music/{yyyymmdd}` | true           |

> PARAMETERS(`POST`)

| musicId | 음악 아이디 | number, Required |
| ------- | ----------- | ---------------- |
| genreId | 장르 아이디 | number, Required          |
> Example Response(`GET`)

```json
{
  "result": true,
  "data": {
    "diaryMusic": {
      // recommend: Top3 music, addRecommend: Lower2 music
      "recommend": [
        {
          "id": 443774139,
          "title": "추억은 만남보다 이별에 남아",
          "artist": "정동하",
          "genreId": 3550,
          "img": "https://cdn.music-flo.com/image/v2/album/773/792/05/04/405792773_6013c0d2_s.jpg?1611907284136/dims/resize/75x75/quality/90",
          "videoId": "_iP6_RAd9zY"
        }, ...
      ],
      "addRecommend": [
        {
          "id": 437461917,
          "title": "Dynamite",
          "artist": "방탄소년단",
          "genreId": 3551,
          "img": "https://cdn.music-flo.com/image/album/840/977/04/04/404977840_5f6430c2.jpg?1600401602856/dims/resize/75x75/quality/90",
          "videoId": "gdZLi9oWNZg"
        }, ...
      ]
    }
  }
}
```

> Example Request(`POST`)

```json
{
  "genreId": 3551,
  "musicId": 437461917
}
```

> Example Response(`POST`)

```json
{
  "result": true,
  "data": {
    "diaryMusic": "음악 선택이 완료되었습니다.",
    "topEmotion": "positive"
  }
}
```



## Music

Music 관련 API

### /music/{musicList}

해당 playlist의 음악정보를 불러옵니다.

일기날자 내림차순

**(참고) default는 선택한 음악 리스트와 유저가 커스텀한 playlist들을 불러옵니다.**

> ENDPOINT

| Method | function              | Request Url       | Authentication |
| ------ | --------------------- | ----------------- | -------------- |
| `GET`  | fetchAllPlayList      | `/music`          | true           |
| `GET`  | fetchPositivePlayList | `/music/positive` | true           |
| `GET`  | fetchNegativePlayList | `/music/negative` | true           |
| `GET`  | fetchNeutralPlayList  | `/music/neutral`  | true           |

> Example Request(`fetchAllPlayList`)

```
/music
```

> Example Response(`fetchAllPlayList`)

모든 playlist

```json
{
  "result": true,
  "data": {
    "popular": [{
      "id": 443774139,
      "title": "추억은 만남보다 이별에 남아",
      "artist": "정동하",
      "genreId": 3550,
      "img": "https://cdn.music-flo.com/image/v2/album/773/792/05/04/405792773_6013c0d2_s.jpg?1611907284136/dims/resize/75x75/quality/90",
      "videoId": "_iP6_RAd9zY"
    },],
    "positive": [{
      "diaryDate": 20220521,
      "updateAt": {},
      "id": 443774139,
      "title": "추억은 만남보다 이별에 남아",
      "artist": "정동하",
      "genreId": 3550,
      "img": "https://cdn.music-flo.com/image/v2/album/773/792/05/04/405792773_6013c0d2_s.jpg?1611907284136/dims/resize/75x75/quality/90",
      "videoId": "_iP6_RAd9zY"
    },],
    "negative": [],
    "neutral": []
  }
}
```

> Example Request(`fetchPositivePlayList`)

```
/music/positive
```

> Example Response(`fetchPositivePlayList`)

```json
{
  "result": true,
  "data": {
    "positive": [{
      "diaryDate": 20220521,
      "updateAt": {},
      "id": 443774139,
      "title": "추억은 만남보다 이별에 남아",
      "artist": "정동하",
      "genreId": 3550,
      "img": "https://cdn.music-flo.com/image/v2/album/773/792/05/04/405792773_6013c0d2_s.jpg?1611907284136/dims/resize/75x75/quality/90",
      "videoId": "_iP6_RAd9zY"
    },]
  }
}
```

