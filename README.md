# Video Post
**python version: 3.9**

Download videos from tiktok and post in: 
* facebook page
* youtube shorts
* instagram reels
* twitter

## Workflow

The program does the following for each video in the **videos.xlsx** file:

1. Validate the videos in **downloads** folder with the name from the excel file.
2. Validate the duration of the video for each social network, and made the necessaries file conversions. 

Note: each social network have different limits of duration for the videos.
If a video is longer than the page limits, it is automatically skipped.

* **facebook:** 240 minutes
* **youtube shorts:** 60 seconds
* **instagram reels:** 60 seconds
* **twitter:** 2:20 minutes

Additional, for upload the videos to twitter, they require and extra conversion with the page: https://servicios-web.online-convert.com/es/convertir-para-twitter.

3. Post the video in each social network type the tilte, description and tags/keywords.
4. Move the video to **done** folder.

After post all videos, the output file is updated. 

# Install
## Third party modules

Install all modules from pip: 

``` bash
$ pip install -r requirements.txt
```

## Programs

To run the project, the following programs must be installed:: 

* [Google Chrome](https://www.google.com/intl/es/chrome) last version

## Generate Google API Key

You can learn how to generate an API Key for google spreadsheets, in this [tutorial](https://github.com/DariHernandez/generate-google-sheets-api-key)

## Create spreadsheet

# How to use

## Setup chrome

This project does not require users and passwords to login, instead it will use the sessions that you already have opened in your browser.

Before running the project, you need to do some extra steeps for prepare your google chrome.

1. Login to your instagram account.
2. Login to a facebook account how have access for post in the facebook page.
3. Login to yout twitter account.
4. Login to your youtube account.
5. Install the following extensions in chrome: [AdBlock](https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom?hl=es-419) y [Insist](https://chrome.google.com/webstore/detail/inssist-web-client-for-in/bcocdbombenodlegijagbhdjbifpiijp?hl=en-US)

## Con fig file

All **configurations** are saved in the **config.json file**, so **you can edit it manually**

```json
{
 "chrome_folder": "C:\\Users\\{your user name}\\AppData\\Local\\Google\\Chrome\\User Data",
 "facebook_page": "https://business.facebook.com/Sample-107579735102375/?business_id=133263535761366",
 "upload_instagram": false,
 "upload_facebook": false,
 "upload_twitter": true,
 "upload_youtube": false
}
```

* ### chrome_folder
The path of google chrome data. By default, in windows, there it in: **C:\\Users\\{your user name}\\AppData\\Local\\Google\\Chrome\\User Data**
* ### facebook_page
Link of your facebook page.
* ### upload_instagram
Post (true) or skip (false) all the videos for instagram
* ### upload_facebook
Post (true) or skip (false) all the videos for facebook
* ### upload_twitter
Post (true) or skip (false) all the videos for twitter
* ### upload_youtube
Post (true) or skip (false) all the videos for youtube

## Excel videos file

In the file **videos.xlsx**, there are all information about the video to upload.
The columns of the file are: 

Column|description|sample
|---|---|---|
link|tiktok video link| https://www.tiktok.com/...8670874256902 
title|title of the video to post in all social networks| Dancing
description|description / caption for add to the video| Hello, this is my first dancing videos
tags|keywords or hashtags, separated by commas| shorts,tiktok,dancing,funny
processed|status of the video: processed by the program or not. By default, **no**| yes
Uploaded Instagram|if the video is already processed, show if it have been posted in this social network. By default, **no**| no
Uploaded Facebook|if the video is already processed, show if it have been posted in this social network. By default, **no**| yes
Uploaded Twitter|if the video is already processed, show if it have been posted in this social network. By default, **no**| no
Uploaded Youtube|if the video is already processed, show if it have been posted in this social network. By default, **no**| yes

## Run program

After do the last steps, you can use the program running the **__ main__.py** or the project folder with your python 3.9 interpreter.

Only, before of each running, be sure of: 

### Kill chrome processes

**Kill/end** from task manager (windows) or htop (link), **all google chrome processes**.

### Close excel file

Be sure to close the **videos.xlsx** files before run.

# Warnings

## Youtube

By default, youtube have a **limit of 15 uploads per day**. You can upload more videos with a manually verification. 
If you try to upload more videos without the verification, the program will raise an error.

## Instagram

For upload reels to instagram, we use the extension **INSSIST**.
At this time, the **extension have a bug** that allow us to **post reels without limits**, but when the developers fix it, **you will need to pay for the extension** to continue using the reels (at the moment, there are no other alternatives).