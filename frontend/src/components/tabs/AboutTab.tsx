import { COURSE } from "../../data/team";
import Icon from "../Icon";

export default function AboutTab() {
  return (
    <div className="tabpane">
      <section className="about-hero card">
        <h2 className="section-title">About this project</h2>
        <p className="about-lead">
          GradeLens predicts a student's final exam score from everyday factors
          like study hours, attendance, sleep, and home support. It is a course
          project: the goal is to show, in a clear way, how a machine learning
          model reaches a number and what that number depends on.
        </p>
        <p className="about-note">
          It is a study tool, not a verdict. The score is an estimate based on
          past data and is meant to spark useful changes, not to label anyone.
        </p>
      </section>

      <div className="section-head">
        <h3 className="section-title section-title--sm">Who made it</h3>
        <p className="section-sub">
          {COURSE.group}, class {COURSE.class}. {COURSE.code} {COURSE.name},{" "}
          {COURSE.institution}.
        </p>
      </div>

      <div className="purposegrid">
        <div className="card purpose">
          <span className="purpose__icon"><Icon name="target" size={20} /></span>
          <h4>What it is for</h4>
          <p>Estimate an exam score and see which habits matter most.</p>
        </div>
        <div className="card purpose">
          <span className="purpose__icon"><Icon name="users" size={20} /></span>
          <h4>Who it is for</h4>
          <p>Students and teachers who want a quick read on likely performance.</p>
        </div>
        <div className="card purpose">
          <span className="purpose__icon"><Icon name="book" size={20} /></span>
          <h4>What it is built on</h4>
          <p>A Linear Regression model trained on 6,607 student records.</p>
        </div>
      </div>
    </div>
  );
}
