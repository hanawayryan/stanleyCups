/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 **/

'use strict';
// 2D array where 1st row is name of team, and 2nd row is number of cups the team in the same column has won
var totals = [["hurricanes", "blue jackets", "devils", "islanders", "rangers", "flyers", "penguins","capitals", "bruins", "sabres", "red wings", "panthers",
  + "canadiens", "senators", "lightning", "maple leafs", "blackhawks", "avalanche", "stars", "wild", "predators", "blues", "jets", "ducks", "coyotes", "flames",
  + "oilers", "kings", "sharks", "canucks", "golden knights"], [1, 0, 3, 0, 4, 2, 5, 1, 6, 0, 11, 0, 24, 0, 1, 13, 6, 2, 1, 0, 0, 0, 0, 1, 0, 1, 5, 2, 0, 0, 0]];

var handlers = {
  'LaunchRequest': function () {
    this.emit(':tell ', "No intent by that name."); 
  },
  //Starts skill and asks user to give team they wish to learn about
  'introintent': function () {
    this.response.speak("What team would you like to know the total Stanley Cup championships?").listen("What team would you like to know the total Stanley Cup championships?");
    this.emit(':responseReady');
  },
//user gives name of team they want to know the number of cups. this is sent to method getCupResponse where number is cups is searched for
  'team_choose': function () {
    let team = this.event.request.intent.slots.team.value;
    this.response.speak((getCupResponse(team)));
    this.emit(':responseReady');
  },
};

// method that given team name finds the corresponding amount of cups won by searching for valid team and corresponding cup number. Then the response is built 
// depending if the team is valid or not. That response is sent back to team_choose intent so alexa can respond.
function getCupResponse(team) {
  for (let i = 0; i < totals[0].length; i++)
  {
      //based on the number of cups output will change to make it sound nice ;)
    if(team == totals[0][i] && totals [1][i] > 1) {
      return("The " + team + " won the Stanley Cup " + (totals[1][i]) + " times.");
    }
    else if(team == totals[0][i] && totals [1][i] == 0) {
      return("The " + team + " have never won the Stanley Cup.");
    }
    else if(team == totals[0][i] && totals [1][i] == 1) {
      return("The " + team + " won the Stanley Cup " + (totals[1][i]) + " time.");
    }
  }
  return("That team does not exist.");
}

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
