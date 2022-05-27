<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
        <html> 
            <body> 
                <h1>Catalog</h1>
                <ul>
                    <xsl:for-each select="catalog/product">
                        <li>
                            <article><h3><xsl:value-of select="@product_id"/></h3></article>
                        </li>     
                        <li>
                            <article><p><xsl:value-of select="@description"/></p></article>
                        </li>                    
                    </xsl:for-each>
                </ul>
                <h2>Catalog Items</h2>
                <table border="1">
                    <tr bgColor="pink">
                        <th>Item Number</th>
                        <th>Price</th>
                        <th>Gender</th>
                        <th>Small</th>
                        <th>Medium</th>
                        <th>Large</th>
                        <th>Extra Large</th>
                    </tr>
                    <xsl:for-each select="catalog/product/catalog_item">
                        <tr>
                            <td>
                                <xsl:value-of select="item_number"/>
                            </td>
                            <td>
                                <xsl:value-of select="price"/>
                            </td>
                            <td>
                                <xsl:choose>
                                    <xsl:when test="@gender='Men'">M</xsl:when>
                                    <xsl:otherwise>W</xsl:otherwise>
                                </xsl:choose>
                            </td>
                            <td>
                            <xsl:if test="size/@description='Small'">
                                <table border="1">
                                    <tr>
                                        <th>Color</th>
                                        <th>Image</th>
                                    </tr>
                                        <xsl:for-each select="size[@description='Small']/color_swatch">
                                            <tr>
                                                <td>
                                                   <xsl:value-of select="."/>
                                                </td>
                                                <td>
                                                    <xsl:value-of select="@image"/>
                                                </td>
                                            </tr>
                                        </xsl:for-each>
                                </table>
                            </xsl:if>
                            </td>
                            <td>
                                <xsl:if test="size/@description='Medium'">
                                    <table border="1">
                                        <tr>
                                            <th>Color</th>
                                            <th>Image</th>
                                        </tr>
                                            <xsl:for-each select="size[@description='Medium']/color_swatch">
                                                <tr>
                                                    <td>
                                                        <xsl:value-of select="."/>
                                                    </td>
                                                    <td>
                                                        <xsl:value-of select="@image"/>
                                                    </td>
                                                </tr>
                                            </xsl:for-each>
                                    </table>
                                </xsl:if>                   
                            </td>
                            <td>
                               <xsl:if test="size/@description='Large'">
                                <table border="1">
                                    <tr>
                                        <th>Color</th>
                                        <th>Image</th>
                                    </tr>
                                        <xsl:for-each select="size[@description='Large']/color_swatch">
                                            <tr>
                                                <td>
                                                    <xsl:value-of select="."/>
                                                </td>
                                                <td>
                                                    <xsl:value-of select="@image"/>
                                                </td>
                                            </tr>
                                        </xsl:for-each>
                                </table>
                            </xsl:if>
                            </td>
                            <td>
                            <xsl:if test="size/@description='Extra Large'">
                                <table border="1">
                                    <tr>
                                        <th>Color</th>
                                        <th>Image</th>
                                    </tr>
                                        <xsl:for-each select="size[@description='Extra Large']/color_swatch">
                                            <tr>
                                                <td>
                                                    <xsl:value-of select="."/>
                                                </td>
                                                <td>
                                                    <xsl:value-of select="@image"/>
                                                </td>
                                            </tr>
                                        </xsl:for-each>
                                </table>
                            </xsl:if>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>