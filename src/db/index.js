import Family from './family'
import Knowledge from './knowledge'
import Task from './task'
import Experience from './experience'
import Rewards from "./rewards"
import Motivation from "./motivation"

module.exports={
    Family, Knowledge,Task, Experience,Rewards,Motivation,
    init(){
        Knowledge.init()
        Task.init()
        Experience.init()
        Rewards.init()
        Motivation.init()
        return Family.init()
    }
}
