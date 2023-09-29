# leaflet-challenge_reja
Module 15 challenge


## Background ## 

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.


## Files ##

Downloaded the following files to help you get started:

Module 15 Challenges [files](https://bootcampspot.instructure.com/courses/3819/assignments/56647?module_item_id=1000344)

## Instructions ##

The instructions for this activity are broken into two parts:

- **Part 1**: Created the Earthquake Visualization

- **Part 2**: Gather and Plot More Data (Optional with no extra points earning)

## Part 1: Create the Earthquake Visualization ##

My first task is to visualize an earthquake dataset. Completed the following steps to do so:

1. Got the dataset. To do so, follow these steps:

   - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visited the [USGS GeoJSON FeedLinks](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and chose a dataset to 
     visualize. The following image is an example screenshot of what appears when you visit this link:

     ![alt text](https://github.com/mdyousufreja/leaflet-challenge_reja/assets/135454460/59ce9127-0b54-4bd5-84a9-fca2f75436c5)

   -  When you click a dataset (such as "All Earthquakes from the Past 7 Days"), you will be given a JSON representation of that data. Used the URL of this JSON to pull in the data for the visualization. The following image is a            sampling of earthquake data in JSON format:
     ![alt text](https://github.com/mdyousufreja/leaflet-challenge_reja/assets/135454460/65be5a81-6bc7-4215-a3b8-90a20b78d234)


2. Imported and visualized the data by doing the following:

   - Using Leaflet, created a map that plots all the earthquakes from my dataset based on their longitude and latitude.

       - My data markers reflected the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear 
         darker in color.

       - Hint: The depth of the earth can be found as the third coordinate for each earthquake.

   - Included popups that provide additional information about the earthquake when its associated marker is clicked.

   - Created a legend that will provide context for your map data.

   - My visualization should look something like the below map.
