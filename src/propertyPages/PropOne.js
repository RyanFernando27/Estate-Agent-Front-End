import React, { useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { createRoot } from "react-dom/client";
import "react-tabs/style/react-tabs.css";

function PropOne({ trigger, property }) {
  useEffect(() => {
    if (trigger && property) {
      const newTab = window.open("", "_blank", "width=100%,height=100%");

      if (newTab) {
        newTab.document.open();
        newTab.document.write(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Property Details</title>
            <link rel="stylesheet" href="https://unpkg.com/react-tabs/style/react-tabs.css">
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
           
                background-color: #f8f9fa;
              }
              .page-container {
                
                margin: auto;
                background: white;
                padding: 20px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border-radius: 8px;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="page-container">
              <h1>Property Details</h1>
              <div id="page-content"></div>
            </div>
          </body>
          </html>
        `);
        newTab.document.close();

        const container = newTab.document.getElementById("page-content");
        if (container) {
          const content = (
            <>
              <div>
                <Tabs>
                  <TabList>
                    <Tab>Description</Tab>
                    <Tab>Floor Plan</Tab>
                    <Tab>Map</Tab>
                  </TabList>

                  <TabPanel>
                    <p>Property one</p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                      <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, </i>)
                      (<i>English:</i>) is a fictional character featured in
                      video games and related media released by Nintendo.
                      Created by prominent game designer Shigeru Miyamoto, Luigi
                      is portrayed as the slightly younger but taller fraternal
                      twin brother of Nintendo's mascot Mario, and appears in
                      many games throughout the Mario franchise, often as a
                      sidekick to his brother.
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                      <b>Princess Peach</b> (
                      <i>Japanese: ピーチ姫 Hepburn: Pīchi-hime,</i>) is a
                      character in Nintendo's Mario franchise. Originally
                      created by Shigeru Miyamoto, Peach is the princess of the
                      fictional Mushroom Kingdom, which is constantly under
                      attack by Bowser. She often plays the damsel in distress
                      role within the series and is the lead female. She is
                      often portrayed as Mario's love interest and has appeared
                      in Super Princess Peach, where she is the main playable
                      character.
                    </p>
                  </TabPanel>
                </Tabs>
              </div>
            </>
          );

          const root = createRoot(container);
          root.render(content);
        }
      }
    }
  }, [trigger, property]);

  return null;
}

export default PropOne;
