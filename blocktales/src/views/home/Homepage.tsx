

import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite'

import { ArticleList } from './PostList';
import { Search } from './../../components/Search';

import { _ } from "@homenode/jscore/dist"
import { formatDistance, subDays } from 'date-fns'

import {
  Timeline,
  Events,
  createTheme,
  themes
} from '@merc/react-timeline';
import { BlockEvent } from '../../components/BlockEvent';

const customTheme = createTheme(themes.default, {
  card: {
    backgroundColor: 'black',
    color: 'white'
  },
  date: {
    backgroundColor: '#794cff',
  },
  marker: {
    borderColor: '#794cff',
  },
  timelineTrack: {
    backgroundColor: '#794cff',
  },
});

export const Homepage = observer(() => {
  const isSocialConnected = !!_.m().modules.social?.network?.hasUser()
  const isSocialLoading = !!_.m().modules.social?.network?.isLoading
  const isWeb3Connected = _.m().modules.web3?.isConnected
  const posts = _.m().modules.social?.network?.casts ?? []
  return (
    <div style={{
      display: 'grid',
      height: 'calc(100% - 200px)',
      width: "100%",
      justifyContent: 'center',
      alignContent: 'flex-start',
      marginTop: "40px",
      overflowY: 'scroll'
    }}>
      {isSocialConnected && <Search onPostClick={async () => _.m().modules.social?.network?.post("Hello from the BlockTales dApp!")}/>}
      <div style={{ width: "1000px", height: "80vh", backgroundColor: '#b6b6b6'}} >
          <Tabs css={{ width: "100%", }}variant='soft-rounded' colorScheme={'whiteAlpha'}>
            <div style={{display: 'flex', minHeight:'80px', justifyContent: 'space-between', width: '100%', position: "sticky", top: "-21px", backgroundColor: "rgb(255 255 255 / 16%)", padding: "20px"}}>
            {isSocialConnected && (<TabList>
                <Tab>History</Tab>
                <Tab>New</Tab>
                <Tab>Top</Tab>
            </TabList>)}
            </div>
              {!isSocialConnected && isWeb3Connected && !isSocialLoading && (
                <div style={{
                  display:"flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: 'center',
                  marginTop: "100px"
                }}>
                  <p style={{ color: "white"}}>blockbook requires a farcaster account</p>
                </div>
              )}
              {isSocialConnected && (<TabPanels style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
                <TabPanel style={{backgroundColor: '#b6b6b6', overflowY: 'auto'}}>
                  <Timeline theme={customTheme} opts={{layout: "inline-evts"}} >
                  <Events>
                    {posts?.map((value, i) => {
                      return (
                        <BlockEvent key={i} date={formatDistance(subDays(new Date(), i), new Date())} text={JSON.stringify((value as any).body.data.text)} />
                      )
                    })}
                  </Events>
                </Timeline>
              </TabPanel>
                <TabPanel>
                    <div style={{
                      display:"flex",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: 'center',
                      marginTop: "100px"
                    }}>
                      <p style={{ color: "white"}}>new coming soon</p>
                    </div>
                </TabPanel>
                <TabPanel>
                    <div style={{
                      display:"flex",
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: 'center',
                      marginTop: "100px"
                    }}>
                      <p style={{ color: "white"}}>top coming soon</p>
                    </div>
                </TabPanel>
            </TabPanels>)}

          </Tabs>

      </div>
     
    </div>
  )

})