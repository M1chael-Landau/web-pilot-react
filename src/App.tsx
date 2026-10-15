import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const THEME_KEY = 'web-pilot-react-theme'

function useThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = window.localStorage.getItem(THEME_KEY)
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    window.localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
  }, [dark])

  return { dark, setDark }
}

function App() {
  const { dark, setDark } = useThemeToggle()
  const [count, setCount] = useState(0)
  const [draft, setDraft] = useState('')
  const [echo, setEcho] = useState('')

  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-8 sm:gap-6 sm:px-6 sm:py-12">
        <header className="flex flex-col gap-2">
          <h1 className="font-heading text-2xl font-semibold tracking-tight sm:text-4xl">
            Пилот 2: React + shadcn
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Настоящий фреймворк-код (Vite, React, TypeScript, Tailwind и shadcn/ui),
            собранный из исходников и опубликованный на GitHub Pages.
          </p>
        </header>

        <div className="flex items-center justify-between gap-4 rounded-xl bg-card p-3 ring-1 ring-foreground/10 sm:p-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Тёмная тема</span>
            <span className="text-xs text-muted-foreground">
              Выбор сохраняется в localStorage
            </span>
          </div>
          <Switch
            checked={dark}
            onCheckedChange={setDark}
            aria-label="Переключить тёмную тему"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Счётчик</CardTitle>
            <CardDescription>
              Нажмите кнопку — состояние React действительно работает на странице.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-start gap-4">
            <div className="font-mono text-4xl font-semibold tabular-nums sm:text-5xl">
              {count}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setCount((value) => value + 1)}>
                Увеличить
              </Button>
              <Button variant="outline" onClick={() => setCount(0)}>
                Сбросить
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground">
            Значение живёт только в памяти вкладки.
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Вкладки</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info">
              <TabsList className="mb-3">
                <TabsTrigger value="info">Инфо</TabsTrigger>
                <TabsTrigger value="more">Ещё</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className="text-sm text-muted-foreground">
                Это вторая часть пары: та же связка «сборка → GitHub Pages → QR»,
                но уже на реальном коде, а не на статичном HTML.
              </TabsContent>
              <TabsContent value="more" className="text-sm text-muted-foreground">
                Приложение одностраничное, поэтому подпуть-маршрутов нет и
                ошибка 404 при обновлении страницы не возникает.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Эхо текста</CardTitle>
            <CardDescription>
              Введите строку и нажмите кнопку — она вернётся ниже.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Введите текст"
                aria-label="Текст для эха"
              />
              <Button
                onClick={() => setEcho(draft.trim())}
                disabled={draft.trim().length === 0}
              >
                Показать
              </Button>
            </div>
            {echo ? (
              <p className="rounded-lg bg-muted px-3 py-2 text-sm break-words">
                {echo}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Пока ничего не введено.
              </p>
            )}
          </CardContent>
        </Card>

        <footer className="pt-2 text-center text-xs text-muted-foreground">
          Пилот 2 — React + shadcn/ui на GitHub Pages. Собрано из исходников Vite.
        </footer>
      </div>
    </div>
  )
}

export default App
