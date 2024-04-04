# Web Development Project 6 - Pokemon Search Dashboard

Submitted by: Diego Navarro

This web app: Takes in a search string and displays all pokemon with that search string in their name.

Time spent: 8 hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The app includes at least one unique chart developed using the fetched data that tell an interesting story**
- [x] **Clicking on an item in the list view displays more details about it**
- [x] **Clicking on an item has a direct, unique link to that item's detail view page**

The following **optional** features are implemented:

- [ ] The site's customized dashboard contains more content that explains what is interesting about the data
- [ ] The site allows users to toggle between different data visualizations

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='HW6.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with LiceCap

## Notes

Describe any challenges encountered while building the app.

The main challenge was figuring out how to properly perform routing. It was a little confusign at first figuring out the format of my main.jsx to have a browser router wrap around the whole application. From there It was also difficult deciding what data for each pokemon to display, as alot of the attributes of pokemon are very variable so how eveyrthing fits in the details page could vary by size a lot depending on the pokemon. I ended up choosing attributes that are guaranteed to have only one value to ensure text does not leak out the box when viewing details.

## License

    Copyright 2024 Diego Navarro

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
