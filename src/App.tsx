import { useState } from 'react';

// definisi tipe data untuk 1 task
type Task = {
  id: number
  title: string
  status: 'todo' | 'doing' | 'done' // hanya 3 nilai yang valid
}

// tipe untuk column
type ColumenType = 'todo' | 'doing' | 'done'

// config untuk setiap colomn
const columnconfig: Record<ColumenType, {title: string; emoji:string; color: string }> = {
  todo: { title: 'To Do', emoji: '📝', color: 'border-blue-500'},
  doing: { title: 'In Progress', emoji: '🔥', color: 'border-yellow-500'},
  done: { title: 'Done', emoji: 'ꪜ', color: 'border-green-500'},
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]) 
  const [inputValue, setinputValue] = useState('')

  const addTask = () => {
    if (inputValue.trim() === '') return

    const newTask: Task = {
      id: Date.now(),
      title: inputValue.trim(),
      status: 'todo'
    }

    setTasks([...tasks, newTask])
    setinputValue('')
  }

const moveTask = (taskId: number, newStatus: ColumenType) => {
  setTasks(tasks.map(task =>
    task.id === taskId ? {...task, status: newStatus } : task
  ))
}

const deleteTask = (taskId: number) => {
  setTasks(tasks.filter(task => task.id !== taskId))
}

const getTasksByStatus = (status: ColumenType) => {
  return tasks.filter(task => task.status === status)
}

const columns: ColumenType[] = ['todo', 'doing', 'done']

return (
  <div className="min-h-screen bg-gray-900 text-white p-8">
<h1
  className="text-5xl md:text-6xl font-extrabold text-center mb-10
            text-cyan-300
            bg-white/10
            backdrop-blur-md
            border border-cyan-400/30
            rounded-3xl
            py-5 px-8
            tracking-wide
            shadow-[0_0_30px_rgba(34,211,238,0.35)]
            drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]
            hover:shadow-[0_0_60px_rgba(34,211,238,0.7)]
            transition-all duration-450"
>
  📋 List Tugas Andhika Dianputra 📋 
</h1>
    <p className="text-center text-gray-400">
      Tasks: {tasks.length} | input: "{inputValue}" 
    </p>
    <div className="max-w-md mx-auto flex gap-2 mb-8">
      <input
      type="text"
      value={inputValue}
      onChange={(e) => setinputValue(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && addTask()}
      placeholder="Tambah Tugas Baru..."
      className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outlate-none focus:border-cyan-500 transition-colors"
      />
      <button
      onClick={addTask}
      className='px-6 py-2
           bg-cyan-600 hover:bg-cyan-500
           text-cyan-100
           rounded-lg font-bold
           border border-cyan-300/40
           shadow-[0_0_10px_#22d3ee,0_0_20px_rgba(34,211,238,0.5)]
           hover:shadow-[0_0_20px_#22d3ee,0_0_40px_rgba(34,211,238,0.9)]
           hover:-translate-y-1
           transition-all duration-300'
      >
        + Add
      </button>
    </div>
    <div className="flex justify-center gap-4 mb-6">
      <div className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm">
        📝 Todo: {getTasksByStatus('todo').length}
      </div>
      <div className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-lg text-sm">
        🔥 Doing: {getTasksByStatus('doing').length}
      </div>
      <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm">
        ꪜ  Done: {getTasksByStatus('done').length}
      </div>
    </div>
    {/* Board: 3 Columns */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
  {columns.map((status) => {
    const config = columnconfig[status]
    const columnTasks = getTasksByStatus(status)

    return (
      <div
        key={status}
        className={`bg-gray-800/50 rounded-xl p-4 border-t-4 ${config.color}
                    backdrop-blur-sm animate-slide-in`}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">
            {config.emoji} {config.title}
          </h2>

          <span className="bg-gray-700 text-xs px-2 py-1 rounded-full">
            {columnTasks.length}
          </span>
        </div>

        {/* Task Cards */}
        <div className="space-y-2 min-h-[100px]">
          {columnTasks.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-8">
              Tidak ada tugas nih tambah donggg...
            </p>
          ) : (
            columnTasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700
                           transition-all group animate-fade-in"
              >
                <p className="text-sm mb-2">{task.title}</p>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {status !== 'todo' && (
                    <button
                      onClick={() =>
                        moveTask(
                          task.id,
                          status === 'doing' ? 'todo' : 'doing'
                        )
                      }
            className='px-4 py-1.5
           bg-cyan-600 hover:bg-cyan-500
           text-sm text-white
           rounded-md font-semibold
           shadow-[0_0_10px_rgba(34,211,238,0.45)]
           hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
           transition-all duration-300'
                    >
                      ← Back
                    </button>
                  )}

                  {status !== 'done' && (
                    <button
                      onClick={() =>
                        moveTask(
                          task.id,
                          status === 'todo' ? 'doing' : 'done'
                        )
                      }
          className='px-4 py-1.5
           bg-cyan-600 hover:bg-cyan-500
           text-sm text-white
           rounded-md font-semibold
           shadow-[0_0_10px_rgba(34,211,238,0.45)]
           hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]
           transition-all duration-300'
                    >
                      Next →
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-xs px-2 py-1 bg-red-600/50 hover:bg-red-600
                               rounded transition-colors ml-auto cursor-pointer"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    )
  })}
</div>
  </div>
)
}

export default App