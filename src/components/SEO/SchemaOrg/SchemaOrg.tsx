import React from "react"

export async function SchemaOrg() {

    const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ringpublishing.com/#organisation",
            "name": "Ring Publishing - all-in-one publishing platform for digital media brands",
            "url": "https://ringpublishing.com/",
            "logo": "",
            "description": "Looking for a partner for your digital transformation? Ring Publishing - an all-in-one digital publishing solution, with over 20 years of experience, helping media brands succeed in the digital era",
            "sameAs": [],
            "contactPoint": {"@type": "ContactPoint", "telephone": "", "contactType": "Customer Service"}
        }

    return (<script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
    />)
}
