<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
        <html> 
            <body> 
                <h2>Table1</h2>
                <table border="1">
                    <tr bgColor="yellow">
                        <th>Product name</th>
                        <th>Manufacturer id</th>
                        <th>Description</th>
                        <th>USD price</th>
                    </tr>
                    <!-- XPATH: //products/product[@shippable='true']/productName -->
                    <xsl:for-each select="products/product[@shippable='true']">
                        <tr>
                            <td>
                                <xsl:value-of select="productName"/>
                            </td>
                            <td>
                                <xsl:value-of select="manufacturer"/>
                            </td>
                            <td>
                                <xsl:value-of select="description"/>
                            </td>
                            <td>
                                <xsl:value-of select="prices/price[1]"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <h2>Table2</h2>
                <table border="1">
                    <tr bgColor="pink">
                        <th>Product name</th>
                        <th>Description</th>
                        <th>USD price</th>
                        <th>Euro price</th>
                    </tr>
                    <xsl:for-each select="products/product[manufacturer/@id='acme']">
                        <tr>
                            <td>
                                <xsl:value-of select="productName"/>
                            </td>
                            <td>
                                <xsl:value-of select="description"/>
                            </td>
                            <td>
                                <xsl:value-of select="prices/price[1]"/>
                            </td>
                            <td>
                                <xsl:value-of select="prices/price[3]"/>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>