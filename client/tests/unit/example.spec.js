import { shallowMount } from '@vue/test-utils'
import Post from '@/components/Post.vue'

describe('Post.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Post, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
