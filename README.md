<div><a href='https://github.com/github.com/darideveloper/blob/master/LICENSE' target='_blank'>
            <img src='https://img.shields.io/github/license/github.com/darideveloper.svg?style=for-the-badge' alt='MIT License' height='30px'/>
        </a><a href='https://www.linkedin.com/in/francisco-dari-hernandez-6456b6181/' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=LinkedIn&color=0A66C2&logo=LinkedIn&logoColor=FFFFFF&label=' alt='Linkedin' height='30px'/>
            </a><a href='https://t.me/darideveloper' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=Telegram&color=26A5E4&logo=Telegram&logoColor=FFFFFF&label=' alt='Telegram' height='30px'/>
            </a><a href='https://github.com/darideveloper' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=GitHub&color=181717&logo=GitHub&logoColor=FFFFFF&label=' alt='Github' height='30px'/>
            </a><a href='https://www.fiverr.com/darideveloper?up_rollout=true' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=Fiverr&color=222222&logo=Fiverr&logoColor=1DBF73&label=' alt='Fiverr' height='30px'/>
            </a><a href='https://discord.com/users/992019836811083826' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=Discord&color=5865F2&logo=Discord&logoColor=FFFFFF&label=' alt='Discord' height='30px'/>
            </a><a href='mailto:darideveloper@gmail.com?subject=Hello Dari Developer' target='_blank'>
                <img src='https://img.shields.io/static/v1?style=for-the-badge&message=Gmail&color=EA4335&logo=Gmail&logoColor=FFFFFF&label=' alt='Gmail' height='30px'/>
            </a></div><div align='center'><br><br><img src='https://github.com/darideveloper/video-post/blob/master/logo.png?raw=true' alt='Video Post' height='80px'/>

# Video Post

Download videos from tiktok and post in: 
* facebook page
* youtube shorts
* instagram reels
* twitter
* tiktok

Start date: **2021-11-23**

Last update: **2023-04-12**

Project type: **client's project**

</div><br><details>
            <summary>Table of Contents</summary>
            <ol>
<li><a href='#buildwith'>Build With</a></li>
<li><a href='#media'>Media</a></li>
<li><a href='#details'>Details</a></li>
<li><a href='#install'>Install</a></li>
<li><a href='#settings'>Settings</a></li>
<li><a href='#run'>Run</a></li></ol>
        </details><br>

# Build with

<div align='center'><a href='https://www.python.org/' target='_blank'> <img src='https://cdn.svgporn.com/logos/python.svg' alt='Python' title='Python' height='50px'/> </a><a href='https://requests.readthedocs.io/en/latest/' target='_blank'> <img src='https://requests.readthedocs.io/en/latest/_static/requests-sidebar.png' alt='Requests' title='Requests' height='50px'/> </a><a href='https://www.selenium.dev/' target='_blank'> <img src='https://cdn.svgporn.com/logos/selenium.svg' alt='Selenium' title='Selenium' height='50px'/> </a><a href='https://sheets.google.com/' target='_blank'> <img src='https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png' alt='Google Sheets' title='Google Sheets' height='50px'/> </a></div>

# Details

## Workflow

1. Checks if the current time and date match the publication date configured in the google sheet.

1. Validate the videos in *downloads* folder with the name or download it from tiktok.

2. Validate the duration of the video for each social network, and made the necessaries file conversions. 

Note: each social network have different limits of duration for the videos.
If a video is longer than the page limits, it is automatically skipped.

* **facebook:** 240 minutes
* **youtube shorts:** 60 seconds
* **instagram reels:** 60 seconds
* **tiktok:** 60 seconds
* **twitter:** 2:20 minutes

Additional, for upload the videos to twitter, they require and extra conversion with the page: https://servicios-web.online-convert.com/es/convertir-para-twitter (This step is done automatically)

3. Post the video in each social network type the tilte, description and tags/keywords.

4. Move the video to **done** folder.

After post all videos, the google sheet is updated. 

## Warnings

### Youtube

By default, youtube have a **limit of 15 uploads per day**. You can upload more videos with a manually verification. 
If you try to upload more videos without the verification, the program will raise an error.

### Instagram

For upload reels to instagram, we use the extension **INSSIST**.
At this time, the **extension have a bug** that allow us to **post reels without limits**, but when the developers fix it, **you will need to pay for the extension** to continue using the reels (at the moment, there are no other alternatives).

### Google chrome

While the program is running, you will **not be able to use** your Google Chrome browser
Also, make sure that when you start chrome, it **opens a new blank tab** (not the last open tabs), to avoid errors.

### Files

The program **automatically replaces** the files in the "done" and "downloads" folders. Make sure you don't have any important videos with the same names as the spreadsheet, or you will lose it

### Updates

This is a web automation project.
Web automation **depends** entirely on the **structure of the page**, which means that **if any social network is updated** (for example, facebook) and changes the way videos are uploaded (a structural change (html) with or without changes layout (css)), **the project will need to be updated too**.

# Install

Install all modules from pip: 

``` bash
$ pip install -r requirements.txt
```

# Settings

## Programs

To run the project, the following programs must be installed:: 

* [Google Chrome](https://www.google.com/intl/es/chrome) last version

## Generate Google API Key

You can learn how to generate an API Key for google sheets, in this [tutorial](https://github.com/DariHernandez/tutorials/tree/master/generate%20google%20sheets%20api%20key)

## Create spreadsheet

You need to create a spreadsheet in the same google account that generated your API Key.

The name of the spreadsheet does not matter, but it is recommended to use "video post" or something similar, to easily identify it

### Columns

The names of the columns are the following:

*Note: all letters must be in lowercase and without spaces or extra characters*

* date time
* file or name
* title	
* description
* tags
* processed
* uploaded instagram
* uploaded facebook
* uploaded twitter
* uploaded youtube
* uploaded tiktok

*Note: more detail about the google sheet in* **How to use > Google sheet** *section*

## Setup chrome

This project does not require users and passwords to login, instead it will use the sessions that you already have opened in your browser.

Before running the project, you need to do some extra steeps for prepare your google chrome.

1. Login to your instagram account.
2. Login to a facebook account how have access for post in the facebook page.
3. Login to yout twitter account.
4. Login to your youtube account.
5. Install the following extensions in chrome: [AdBlock](https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom?hl=es-419) y [Insist](https://chrome.google.com/webstore/detail/inssist-web-client-for-in/bcocdbombenodlegijagbhdjbifpiijp?hl=en-US)

## Config file

All **configurations** are saved in a **config.json file**, so **you can create and edit it manually**

This is the content of the file (copy, paste, and replace with your datz):

```json
{
 "chrome_folder": "C:Users{your user name}AppDataLocalGoogleChromeUser Data",
 "facebook_page": "https://www.facebook.com/your_page_name/?ref=pages_you_manage",
 "api_key": "{project folder}video postsheets-340407-d8642222c103.json",
 "sheet_url": "https://docs.google.com/spreadsheets/d/1Eh1...iw0M/edit?usp=sharing",
 "instagram": false,
 "facebook": false,
 "twitter": true,
 "youtube": false,
 "tiktok": false

}
```

### chrome_folder
The path of google chrome data. By default, in windows, there it in: **C:Users{your user name}AppDataLocalGoogleChromeUser Data**

### api_key
Path of your google api key in json format, generated in **Install > Generate Google API Key** section

### sheet_url
Link of the google sheet with edit permissions. Here a [tutorial](https://github.com/DariHernandez/tutorials/tree/master/share%20google%20sheet%20with%20edit%20permissions) about how to generate the link

### facebook_page
Link of your facebook page.

### instagram
Post (true) or skip (false) all the videos for instagram

### facebook
Post (true) or skip (false) all the videos for facebook

### twitter
Post (true) or skip (false) all the videos for twitter

### youtube
Post (true) or skip (false) all the videos for youtube

### tiktok
Post (true) or skip (false) all the videos for youtube

## Google sheet

Her the details about howe to use the columns in the google sheet:

Column|description|sample
|---|---|---|
date time|Date and time in which the post should be published. Important: **dates must be in chronological order.** Format: mm/dd/yyyy h:m|02/05/2022 18:20
url or name|tiktok video link or name of the file in the "downloads" folder (You can use any of the two and the program will detect it automatically)| https://www.tiktok.com/...8670874256902 or video1.mp4
title|title of the video to post in all social networks| Dancing
description|description / caption for add to the video| Hello, this is my first dancing video
tags|keywords or hashtags, separated by commas| shorts,tiktok,dancing,funny
processed|status of the video: processed by the program or not. By default, **no**| yes
uploaded instagram|if the video is already processed, show if it have been posted in this social network. By default, **no**| no
uploaded facebook|if the video is already processed, show if it have been posted in this social network. By default, **no**| yes
uploaded twitter|if the video is already processed, show if it have been posted in this social network. By default, **no**| no
uploaded youtube|if the video is already processed, show if it have been posted in this social network. By default, **no**| yes
uploaded tiktok|if the video is already processed, show if it have been posted in this social network. By default, **no**| yes

# Run

After do the last steps, you can use the program running the **__ main__.py** or the project folder with your python 3.9 interpreter.

Only, before of each running, be sure of: 

## Before run

### Kill chrome processes

**Kill/end** from task manager (windows) or htop (linux), **all google chrome processes**.

Here a tutorial about how to [kill google chrome process in windows](https://github.com/DariHernandez/tutorials/tree/master/kill%20google%20chrome%20in%20windows)

### Close google sheet

To ensure data integrity, do not edit or make changes to the spreadsheet while the program is running.


