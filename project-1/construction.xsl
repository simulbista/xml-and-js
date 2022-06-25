<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
    <html>
        <body>
            <table border='1'>
                <tr>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Supply</th>
                    <th>Equipment</th>
                    <th>Worker</th>
                    <th>Address</th>
                </tr>
                <jobs>
                    <xsl:for-each select="/jobs/job">
                        <tr>
                            <job>
                                <td>
                                    <startDate>
                                        <xsl:value-of select="./startDate"/>
                                    </startDate>
                                </td>
                                <td>
                                    <endDate>
                                        <xsl:value-of select="./endDate"/>
                                    </endDate>
                                </td>
                                <td>
                                    <supplies>
                                        <xsl:for-each select="./supplies/supply">
                                            <supply>
                                                <ul>
                                                    <li>
                                                        <material>
                                                            <xsl:value-of select="./material"/>
                                                        </material>
                                                        (<qty>
                                                            <xsl:value-of select="./qty"/>
                                                        </qty>) 
                                                    </li>   
                                                </ul> 
                                            </supply>
                                        </xsl:for-each>
                                    </supplies>
                                </td>
                                <td>
                                    <equipments>
                                        <xsl:for-each select="./equipments/equipment">
                                            <equipment>
                                                <ul>
                                                    <li>
                                                        <type>
                                                            <xsl:value-of select="./type"/>
                                                        </type>
                                                        (<quantity>
                                                            <xsl:value-of select="./quantity"/>
                                                        </quantity>)
                                                    </li>   
                                                </ul> 
                                            </equipment>
                                        </xsl:for-each>
                                    </equipments>
                                </td>
                                <td>
                                    <workers>
                                        <ol>
                                            <xsl:for-each select="./workers/worker">
                                                <worker>
                                                        <li>
                                                            <firstName>
                                                                <xsl:value-of select="./firstName"/>
                                                            </firstName>
                                                            -
                                                            <lastName>
                                                                <xsl:value-of select="./lastName"/>
                                                            </lastName>
                                                            (<role>
                                                                <xsl:value-of select="./role"/>
                                                            </role>)
                                                        </li>
                                                </worker>
                                            </xsl:for-each>
                                        </ol>
                                    </workers>
                                </td>
                                <td>
                                    <address>
                                        <ul>
                                            <li>
                                                Street: 
                                                <street>
                                                    <xsl:value-of select="./address/street"/>
                                                </street>
                                            </li>
                                            <li>
                                                City: 
                                                <city>
                                                    <xsl:value-of select="./address/city"/>
                                                </city>
                                            </li>
                                            <li>
                                                Region:
                                                <region>
                                                    <xsl:value-of select="./address/region"/>
                                                </region>
                                            </li>
                                            <li>
                                                Country:
                                                <country>
                                                    <xsl:value-of select="./address/country"/>
                                                </country>
                                            </li>
                                        </ul>    
                                    </address>
                                </td>
                            </job>
                        </tr>
                    </xsl:for-each>
                </jobs>
            </table>   
        </body>
    </html> 
    </xsl:template>
</xsl:stylesheet>