const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const { log } = require('console')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    })
    await request.post('/api/users', {
      data: {
        name: 'Arto Hellas',
        username: 'hellas',
        password: 'forever',
      },
    })

    await page.goto('/')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'xxxxxx')

      await expect(
        page.getByText('Matti Luukkainen logged-in')
      ).not.toBeVisible()
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'mluukkai', 'salainen')
        await createBlog(page, 'this is a test', 'sotiris', 'www.test.gr')
      })

      test('a new blog can be created', async ({ page }) => {
        await expect(
          page.getByText('a new blog this is a test by sotiris added')
        ).toBeVisible()
        await expect(page.getByText('this is a test sotiris')).toBeVisible()
      })

      test('a blog can be edited', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        // likes is 0
        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
        // after click become 1
        await expect(page.getByText('likes 1')).toBeVisible()
      })

      test('delete button is revealed', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('delete')).toBeVisible()
      })

      test('delete button is not revealed for user who did not create it', async ({
        page,
      }) => {
        await page.getByRole('button', { name: 'log out' }).click()
        await loginWith(page, 'hellas', 'forever')

        await page.getByRole('button', { name: 'show' }).click()
        await expect(page.getByText('delete')).not.toBeVisible()
      })

      test('user deletes his created blog', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        page.on('dialog', (dialog) => dialog.accept())
        await page.getByRole('button', { name: 'delete' }).click()
        await expect(page.getByText('this is a test sotiris')).not.toBeVisible()
      })

      describe('and another blog exists', () => {
        beforeEach(async ({ page }) => {
          await createBlog(
            page,
            'this is a second test',
            'makis',
            'www.test.gr'
          )
        })

        test('2 blogs arranged in the order according to their likes', async ({
          page,
        }) => {
          await page
            .locator('div')
            .filter({ hasText: /^this is a second test makisshow$/ })
            .getByRole('button')
            .click()

          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('button', { name: 'like' }).click()
          await page.getByRole('button', { name: 'hide' }).click()
          await expect(page.getByTestId('blog-list').first()).toContainText(
            'this is a second test makisshow'
          )
          await page
            .locator('div')
            .filter({ hasText: /^this is a test sotirisshow$/ })
            .getByRole('button')
            .click()

            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'like' }).click()
            await page.getByRole('button', { name: 'hide' }).click()
            await expect(page.getByTestId('blog-list').first()).toContainText(
              'this is a test sotirisshow'
            )
        })
      })
    })
  })
})
