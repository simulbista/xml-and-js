<!-- Author: Simul Bista (N01489966) -->

My contributions in the project include:

1) 50% work on the XML file
    converted the 2nd half of the json file to xml
2) Created the xsd
    created the entire xsd and validated it
3) Created the html,js and css files
    created the entire html, js and css files
    For the html and js part, the steps were as follows:
        a) Create displayData function whose end goal is to append the xml converted html blocks to the html file
        b) Create parseJob function that parses xml nodes to json data ; 
            i)this section became a bit complex when it came to dealing with xml nodes that had child nodes which further had child nodes i.e. workers, equipments and supplies
            ii) Hence, the solution implemented to overcome this complexity was to parse each of them using their unique parse functions(e.g: parseSupplies) and to return array of objects that contained the child values.
        c) Next, this data returned from the parse function then is passed to createJob function which generates the html code.
        d) In this createJob function, the complex elements such as workers, equipments and supplies are converted to html elements using their unique create functions (e.g.: createSupplies) that loops through each of their child elements appending them inside <li> tags.
        e) Finally the value returned from the createJob function is appended to the html file in the displayData function.
        f) A bit of css has been added to make the data more presentable.

        THANK YOU!