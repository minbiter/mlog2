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

| 200  | OK: 정상                       |
| ---- | ------------------------------ |
| 400  | Bad Request : 파라미터 오류    |
| 404  | Not Found : 존재하지 않는 요청 |
| 50x  | Server error : 서버 오류       |



## User

사용자 관련 API



### /user

> ENDPOINT

| Method | function | Request Url | Authentication |
| ------ | -------- | ----------- | -------------- |
| `GET`  | login    | `/user`     | false          |
| `post` | signup   | `/user`     | false          |

> PARAMETERS

| id       | 사용자 아이디   | string, Min Length: 5, Max Length: 50, Required(`GET`, `POST`) |
| -------- | --------------- | ------------------------------------------------------------ |
| pw       | 사용자 비밀번호 | string, Min Length: 8, Max Length: 50, Required(`GET`, `POST`) |
| nickName | 사용자 닉네임   | string, Min Length: 2, Max Length: 10, Required(`post`)      |



### /user/{userId}

> ENDPOINT

| Method   | function      | Request Url      | Authentication |
| -------- | ------------- | ---------------- | -------------- |
| `GET`    | logout        | `/user/{userId}` | true           |
| `PATCH`  | editAccount   | `/user/{userId}` | true           |
| `DELETE` | deleteAccount | `/user/{userId}` | true           |

> PARAMETERS (`PATCH`)

| nickName | 사용자 닉네임   | string, Min Length: 2 Max Length: 10, Optional  |
| -------- | --------------- | ----------------------------------------------- |
| pw       | 사용자 비밀번호 | string, Min Length: 8, Max Length: 50, Optional |




## Survey

사용자의 감정마다 선호하는 음악장르를 알기 위한 설문조사 API

### /survey/{userId}

> ENDPOINT

| Method | function     | Request Url        | Authentication |
| ------ | ------------ | ------------------ | -------------- |
| `GET`  | fetchSurvey  | `/survey`          | false          |
| `POST` | createSurvey | `/survey/{userId}` | true           |
| `PUT`  | updateSurvey | `/survey/{userId}` | true           |

> PARAMETERS(`POST`, `PUT`)

| neutral  | 중립 | array, Min Length: 1, Max Length: 3, Required  |
| -------- | ---- | ---------------------------------------------- |
| positive | 긍정 | array, Min Length: 1,  Max Length: 3, Required |
| negative | 부정 | array, Min Length: 1,  Max Length: 3, Required |



## Diary

Diary 관련 API



### /diary/{userId}?startDate=yyyymmdd&endDate=yyyymmdd

범위 내의 작성된 diary의 날짜, 가장 높은 감정, 선택된 음악정보를 불러온다.

**(참고) default 값은 현재 Month 기준으로 불러온다.**

> ENDPOINT

| Method | function     | Request Url       | Authentication |
| ------ | ------------ | ----------------- | -------------- |
| `GET`  | fetchDiaries | `/diary/{userId}` | true           |

> QUERY-STRING

| startDate | start 날짜 | string, Length: 8, Optional |
| --------- | ---------- | --------------------------- |
| endDate   | end 날짜   | string, Length: 8, Optional |



### /diary/{userId}/chart?startDate=yyyymmdd&endDate=yyyymmdd

범위 내의 작성된 diary의 긍정&부정&중립의 비율, 일기작성 수, 일기작성 비율을 불러온다.

**(참고) default값은 현재까지 작성된 모든 diary 기준으로 불러온다.**

> ENDPOINT

| Method | function   | Request Url             | Authentication |
| ------ | ---------- | ----------------------- | -------------- |
| `GET`  | fetchChart | `/diary/{userId}/chart` | true           |

> QUERY-STRING

| startDate | start 날짜 | string, Length: 8, Optional |
| --------- | ---------- | --------------------------- |
| endDate   | end 날짜   | string, Length: 8, Optional |



### /diary/{userId}/{yyyymmdd}

일기 CRUD API

> ENDPOINT

| Method   | function    | Request Url                  | Authentication |
| -------- | ----------- | ---------------------------- | -------------- |
| `GET`    | fetchDiary  | `/diary/{userId}/{yyyymmdd}` | true           |
| `POST`   | createDiary | `/diary/{userId}/{yyyymmdd}` | true           |
| `PATCH`  | updateDiary | `/diary/{userId}/{yyyymmdd}` | true           |
| `DELETE` | deleteDiary | `/diary/{userId}/{yyyymmdd}` | true           |

> PARAMETERS(`POST`, `PATCH`)

| title   | 일기 제목 | string, Max Length: 50, Required |
| ------- | --------- | -------------------------------- |
| content | 일기 내용 | string, Required                 |



### /diary/{userId}/{yyyymmdd}/recommend

해당 날짜의 추천된 음악 불러오기 or 선택된 음악 등록

> ENDPOINT

| Method | function      | Request Url                            | Authentication |
| ------ | ------------- | -------------------------------------- | -------------- |
| `GET`  | fetchRcdMusic | `/diary/{userId}/{yyyymmdd}/recommend` | true           |
| `POST` | postMusic     | `/diary/{userId}/{yyyymmdd}/recommend` | true           |


> PARAMETERS(`POST`)

| musicId | 음악 아이디 | string, Required |
| ------- | ----------- | ---------------- |



## Music

Music 관련 API



### /music/{userId}/playlist?listId=xxx

해당 playlist의 음악정보를 불러옵니다.

**(참고) default는 선택한 음악 리스트와 유저가 커스텀한 playlist들을 불러옵니다.**

> ENDPOINT

| Method | function       | Request Url               | Authentication |
| ------ | -------------- | ------------------------- | -------------- |
| `GET`  | fetchPlayList  | `music/{userId}/playlist` | true           |
| `POST` | creatPlayList  | `music/{userId}/playlist` | true           |
| `PUT`  | updatePlayList | `music/{userId}/playlist` | true           |


> QUERY-STRING

| listId | playlist 아이디 | string, Optional |
| ------ | --------------- | ---------------- |

> PARAMETER(`POST`, `PUT`)

| playList | playlist 아이디 | object[], Required |
| -------- | --------------- | ------------------ |


