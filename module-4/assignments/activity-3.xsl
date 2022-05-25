<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
        <html> 
            <body> 
                <h2>Products Information</h2>
                <xsl:for-each select="products/product">
                    <div bgColor="#red"> 
                            <p style="color: #ff6432;">
                                <xsl:value-of select="productName"/>
                            </p>
                    </div>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>