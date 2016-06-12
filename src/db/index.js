import Family from './family'
import Knowledge from './knowledge'
import Task from './task'
import Experience from './experience'
import Reward from "./reward"
import Goal from "./goal"

module.exports={
    Family, Knowledge,Task, Experience,Reward,Goal,
    init(name){
        Knowledge.init()
        Task.init()
        Experience.init()
        Reward.init()
        Goal.init()
        return Family.init(name)
    }
}
