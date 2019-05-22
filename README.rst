=============
wp-open-data-toronto
=============

------------
Description
------------

The themes will integrate WordPress with a CKAN stack using ckanext-opendatatoronto extension, and dynamically populate CKAN catalogue and pacakge contents within the WordPress pages.

This repository contains two themes:

1. wp-open-data-toronto, which contains the templates for the webpages and the javascript responsible for the connection between CKAN and WordPress

2. wp-bootstrap-starter (contain modifications from the official release) which wp-open-data-toronto is dependent upon. Ideally, this dependency will be removed in the future.

------------
Installation
------------

To install wp-open-data-toronto:

1. Move to the wp-content folder and remove the original themes folder::

     cd /var/www/html/wp-content/
     rm -rf themes/

2. Clone the contents of this repository as the new themes folder::

     git clone https://github.com/CityofToronto/wp-open-data-toronto.git themes

4. Log into the wp-admin console and create the pages with the following configurations::

     | Page Name | URL              | Template       |
     |-----------|------------------|----------------|
     | Homeage   | [host]/homepage  | Homepage       |
     | Catalogue | [host]/catalogue | Catalogue Page |
     | Dataset   | [host]/dataset   | Dataset Page   |

   Note that the Page Name can be modified to be more descriptive if needed, but the URLs must be /dataset and /catalogue.

5. Enable the WP Open Data Toronto theme in Appearances
