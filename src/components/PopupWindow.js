import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function PopupWindow({ trigger, property, closePopup }) {
  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button
          type="button"
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={closePopup}
        ></button>
        {property && (
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Floor Plan</Tab>
              <Tab>Map</Tab>
            </TabList>

            <TabPanel>
              <p>
                <b>Mario</b> (<i>Japanese: マリオ Hepburn: Mario, </i>) (
                <i>English:</i>) is a fictional character in the Mario video
                game franchise, owned by Nintendo and created by Japanese video
                game designer Shigeru Miyamoto. Serving as the company's mascot
                and the eponymous protagonist of the series, Mario has appeared
                in over 200 video games since his creation. Depicted as a short,
                pudgy, Italian plumber who resides in the Mushroom Kingdom, his
                adventures generally center upon rescuing Princess Peach from
                the Koopa villain Bowser. His younger brother and sidekick is
                Luigi.
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <b>Luigi</b> (<i>Japanese: ルイージ Hepburn: Ruīji, </i>) (
                <i>English:</i>) is a fictional character featured in video
                games and related media released by Nintendo. Created by
                prominent game designer Shigeru Miyamoto, Luigi is portrayed as
                the slightly younger but taller fraternal twin brother of
                Nintendo's mascot Mario, and appears in many games throughout
                the Mario franchise, often as a sidekick to his brother.
              </p>
            </TabPanel>
            <TabPanel>
              <p>
                <b>Princess Peach</b> (
                <i>Japanese: ピーチ姫 Hepburn: Pīchi-hime,</i>) is a character
                in Nintendo's Mario franchise. Originally created by Shigeru
                Miyamoto, Peach is the princess of the fictional Mushroom
                Kingdom, which is constantly under attack by Bowser. She often
                plays the damsel in distress role within the series and is the
                lead female. She is often portrayed as Mario's love interest and
                has appeared in Super Princess Peach, where she is the main
                playable character.
              </p>
            </TabPanel>
          </Tabs>
        )}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupWindow;
