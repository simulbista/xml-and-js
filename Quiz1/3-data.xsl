<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/"> 
        <html> 
            <body> 
                <h1>Books catalog</h1>
                <xsl:for-each select="books/book">
                <ul>
                    <li>
                        <h2><xsl:value-of select="title"/></h2>
                    </li>
                    <div>
                    <p>Book was written in <xsl:value-of select="year"/></p>
                    <p>Retail price is $<xsl:value-of select="price"/></p>
                </div>
                </ul>
                </xsl:for-each>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>