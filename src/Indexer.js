


class Indexer {
  
  constructor(){
    this._channelInfoOriginal = require("../metadata/channelInfo.json");
    this._channelInfoExtended = require("../metadata/channelInfo.json");
    this._regionInfo = require("../metadata/regionInfo.json");
    
    this._indexedRegions = {};
    
    // originally, channels are in an Array but it's convenient to have a name LUT
    // that gives the index of this array
    this._channelIndexer = {};
    
    this._reindexRegions();
    this._addRegionNameToChannels();

    
  }
  
  _reindexRegions(){
    for(var i=0; i<this._regionInfo.length; i++){
      this._indexedRegions[ this._regionInfo[i].RegionID ] = {
        name: this._regionInfo[i].RegionName,
        lobe: this._regionInfo[i].Lobe,
      }
    }
  }
  
  
  _addRegionNameToChannels(){
    for(var i=0; i<this._channelInfoExtended.length; i++){
      let region = this._indexedRegions[ this._channelInfoExtended[i].region ]
      this._channelInfoExtended[i].regionName = region.name;
      this._channelInfoExtended[i].lobeName = region.lobe;
      
      this._channelInfoExtended[i].x = parseFloat( this._channelInfoExtended[i].x );
      this._channelInfoExtended[i].y = parseFloat( this._channelInfoExtended[i].y );
      this._channelInfoExtended[i].z = parseFloat( this._channelInfoExtended[i].z );
      
      // build the channel name LUT on the way
      this._channelIndexer[ this._channelInfoExtended[i].channelName ] = i;
    }
  }
  
  
  getChannelObjectByName( name ){
    if( name in  this._channelIndexer ){
      return this._channelInfoExtended[ this._channelIndexer[ name ] ];
    }else{
      console.warn("No channel named " + name );
      return null;
    }
  }
  
  getChannelObjectByIndex( index ){
    if( index > 0 && index < this._channelInfoExtended.length ){
      return this._channelInfoExtended[index];
    }else{
      console.warn("Index is out of bound");
      return null;
    }
  }
  
}

module.exports = Indexer;
