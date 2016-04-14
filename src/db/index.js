import Family from './family'
import Knowledge from './knowledge'
import Task from './task'
import Experience from './experience'

module.exports={
    Family, Knowledge,Task, Experience,
    init(){
        Knowledge.init()
        Task.init()
        Experience.init()
        return Family.init()
    }
}
