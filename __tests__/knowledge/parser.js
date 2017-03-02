import Parser from "../../src/knowledge"

xdescribe("knowledge docx parser", function(){
	function identify(content,expected, officeDocument={}){
		let $=docx4js.parseXml(content)
		let node=$.root().contents().get(0)
		expect(!!node).toBe(true)
		let identified=docx4js.OfficeDocument.identify(node,Object.assign({content:$},officeDocument))
		
		expect(identified.type).toBe(expected)
		
		return identified
	}
    describe("identify", function(){
		describe("properties[title,keywords,category,abstract,subject]", function(){
			"title,keywords,category,abstract,subject,unknown".split(",").forEach(prop=>
				it(`can extract ${prop}`, function(done){
					let content=`<w:sdt>
						<w:sdtPr>
							<w:dataBinding w:xpath="/ns1:coreProperties[1]/ns0:${prop}[1]" />
						</w:sdtPr>
						<w:sdtContent>
							<w:p w:rsidR="00990182" w:rsidRDefault="007021AD">
								<w:r>
									<w:t>my ${prop}</w:t>
								</w:r>
							</w:p>
						</w:sdtContent>
					</w:sdt>`
					extract(newDocx(content)).then(({knowledge})=>{
						switch(prop){
						case "unknown":
							expect(knowledge.props.unknown).toBe(`my ${prop}`)
							break
						case "abstract":case "subject":
							expect(knowledge.summary).toBe(`my ${prop}`)
							break
						default:
							expect(knowledge[prop]).toBe(`my ${prop}`)
						}
						 done()
					 }).catch(failx(done))
				})
			)
		})
	
        it("paragraph,text", function(done){
            let content=`<w:p><w:r><w:t>hello world</w:t></w:r></w:p>`
            extract(newDocx(content)).then((ex)=>{
                let {knowledge}=ex
                    ,{content:html}=knowledge
                 expect(html).toMatch(/<p>hello world<\/p>/ig)
                 done()
             }).catch(failx(done))
        })

        it("table, tr, td", function(done){
            let content=`<w:tbl>
            <w:tblGrid>
				<w:gridCol w:w="2952"/>
			</w:tblGrid>
            <w:tr>
                <w:tc>
                <w:p><w:r><w:t>hello world</w:t></w:r></w:p>
                </w:tc>
            </w:tr>
            </w:tbl>`
            extract(newDocx(content)).then(({knowledge:{content:html}})=>{
                 expect(html).toMatch(/<table><tr><td><p>hello world<\/p><\/td><\/tr><\/table>/ig)
                 done()
             }).catch(failx(done))
        })

        it("image", function(done){
            let content=`<w:p>
    			<w:r>
    				<w:drawing>
    					<wp:inline distT="0" distB="0" distL="0" distR="0">
    						<a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
    							<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
    								<pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
    									<pic:blipFill>
    										<a:blip r:embed="rId10">
    										</a:blip>
    									</pic:blipFill>
    								</pic:pic>
    							</a:graphicData>
    						</a:graphic>
    					</wp:inline>
    				</w:drawing>
    			</w:r>
    		</w:p>
            `, rels=`<Relationship Id="rId10" Type="relationships/image" Target="media/image1.jpg" TargetMode="External"/>`;
            extract(newDocx({"word/document.xml":content,"word/_rels/document.xml.rels":rels})).then(({knowledge:{content:html}})=>{
                 expect(html).toMatch(/<img src="media\/image1.jpg"/ig)
                 done()
             }).catch(failx(done))
        })

        describe("link", function(){
            function linkContent(text,link="a/a.jpg"){
                return `<w:p>
                    <w:hyperlink w:anchor="${link}" w:history="1">
        				<w:r w:rsidR="00E03739" w:rsidRPr="00E03739">
        					<w:t>${text}</w:t>
        				</w:r>
        			</w:hyperlink></w:p>`
            }

            it("should support 'buy'",(done)=>{
                extract(newDocx(linkContent("buy","link"))).then(({knowledge:{content:html}})=>{
                     expect(html).toMatch('<a class="buy" target="buy" href="#link"')
                     done()
                 }).catch(failx(done))
            })

            it("should support '?'",(done)=>{
                extract(newDocx(linkContent("?","link"))).then(({knowledge:{content:html}})=>{
                     expect(html).toMatch('<a class="buy" target="buy" href="#link"')
                     done()
                 }).catch(failx(done))
            })

            it("should not support others", (done)=>{
                extract(newDocx(linkContent("i want to buy"))).then(({knowledge:{content:html}})=>{
                     expect(html).not.toMatch(/<a/ig)
                     expect(html).toMatch("i want to buy")
                     done()
                 }).catch(failx(done))
            })
        })
    })

    it("can upload to remote", function(){

    })

    it("can upload even with photos", function(){

    })
})